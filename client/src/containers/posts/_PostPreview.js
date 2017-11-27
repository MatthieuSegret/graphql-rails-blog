import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

import withCurrentUser from 'queries/currentUserQuery';
import withFlashMessage from 'components/flash/withFlashMessage';

import DELETE_POST from 'graphql/posts/deletePostMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    notice: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    if (window.confirm('Are you sure ?')) {
      this.props.deletePost(this.props.post.id).then(response => {
        if (!response.data.deletePost.errors) {
          this.props.notice('Post was successfully destroyed');
        }
      });
    }
    return false;
  }

  render() {
    const { post, currentUser } = this.props;

    return (
      <tr>
        <td className="title">
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </td>
        <td>{post.author.name}</td>
        <td>{moment(new Date(post.created_at)).fromNow()}</td>
        {currentUser && currentUser.id === post.author.id
          ? [
              <td key="post-edit">
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
              </td>,
              <td key="post-delete">
                <button className="btn btn-default btn-xs" onClick={this.destroy}>
                  Delete
                </button>
              </td>
            ]
          : null}
      </tr>
    );
  }
}

const withDeletePost = graphql(DELETE_POST, {
  props: ({ ownProps, mutate }) => ({
    deletePost(postID) {
      return mutate({
        variables: { id: postID },
        update: (store, { data: { deletePost: { post: postDeleted } } }) => {
          if (!postDeleted) return false;
          const data = store.readQuery({ query: POSTS });
          data.posts = data.posts.filter(post => post.id !== postDeleted.id);
          data.postsCount -= 1;
          store.writeQuery({ query: POSTS, data });
        }
      });
    }
  })
});

export default withDeletePost(withCurrentUser(withFlashMessage(PostPreview)));
