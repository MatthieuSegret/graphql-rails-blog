import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import moment from 'moment';

import withDestroyPost from 'mutations/posts/destroyPostMutation';
import withCurrentUser from 'queries/users/currentUserQuery';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    destroyPost: PropTypes.func.isRequired,
    currentUser: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    if (window.confirm('Are you sure ?')) {
      this.props.destroyPost(this.props.post.id);
    }
    return false;
  }

  render() {
    const { post, currentUser } = this.props;

    return (
      <tr>
        <td className="title"><Link to={`posts/${post.id}`}>{post.title}</Link></td>
        <td>{ post.author.name }</td>
        <td>{ moment(new Date(post.created_at)).fromNow() }</td>
        {currentUser ? [
          <td key="post-edit"><Link to={`posts/${post.id}/edit`}>Edit</Link></td>,
          <td key="post-delete"><button className="btn btn-default btn-xs" onClick={this.destroy}>Delete</button></td>
        ] : null}
      </tr>
    );
  }
}

export const fragments = {
  post: gql`
    fragment PostPreviewFragment on Post {
      id,
      title,
      created_at,
      author {
        id,
        name
      }
    }
  `
};

export default withDestroyPost(withCurrentUser(PostPreview));
