import React, { Component, PropTypes } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import moment from 'moment';

import withDestroyPost from 'mutations/posts/destroyPostMutation';

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    destroyPost: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    this.props.destroyPost(this.props.post.id);
  }

  render() {
    const { post } = this.props;

    return (
      <tr>
        <td className="title"><Link to={`posts/${post.id}`}>{post.title}</Link></td>
        <td>{ post.author.name }</td>
        <td>{ moment(new Date(post.created_at)).fromNow() }</td>
        <td><Link to={`posts/${post.id}/edit`}>Edit</Link></td>
        <td><button className="btn btn-default btn-xs" onClick={this.destroy}>Delete</button></td>
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

export default withDestroyPost(PostPreview);
