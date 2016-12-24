import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render() {
    const { post } = this.props;

    return (
      <tr>
        <td>{ post.title }</td>
        <td>{ post.author.name }</td>
        <td>{ moment(new Date(post.created_at)).fromNow() }</td>
      </tr>
    );
  }
}

PostPreview.fragments = {
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
