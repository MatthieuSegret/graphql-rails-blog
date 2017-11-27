import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import withFlashMessage from 'components/flash/withFlashMessage';

import DELETE_POST from 'graphql/posts/deletePostMutation.graphql';
import POSTS from 'graphql/posts/postsQuery.graphql';

class PostActions extends Component {
  static propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func,
    notice: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    if (window.confirm('êtes vous sûre ?')) {
      this.props.deletePost(this.props.post.id).then(response => {
        if (!response.data.deletePost.errors) {
          this.props.notice('Post was successfully destroyed');
        }
      });
    }
    return false;
  }

  render() {
    const { post } = this.props;

    return (
      <div className="post-actions is-pulled-right">
        <Link to={`/posts/${post.id}/edit`}>
          <span className="icon">
            <i className="fa fa-edit" />
          </span>
        </Link>
        <a onClick={this.destroy}>
          <span className="icon">
            <i className="fa fa-trash-o" />
          </span>
        </a>
      </div>
    );
  }
}

const withDeletePost = graphql(DELETE_POST, {
  props: ({ mutate }) => ({
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

export default withDeletePost(withFlashMessage(PostActions));
