import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import moment from 'moment';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props;

    return (
      <tr>
        <td><Link to={`posts/${post.id}`}>{post.title}</Link></td>
        <td>{ post.author.name }</td>
        <td>{ moment(new Date(post.created_at)).fromNow() }</td>
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
        name
      }
    }
  `
};

export default PostPreview;
