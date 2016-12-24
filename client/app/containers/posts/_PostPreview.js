import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class PostPreview extends Component {
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
