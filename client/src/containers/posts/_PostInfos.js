import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class PostInfos extends Component {
  static propTypes = {
    post: PropTypes.object
  };

  render() {
    const { post } = this.props;

    return (
      <div className="post-info">
        <span className="post-author">By {post.author.name}</span> -
        <span className="post-date"> {moment(new Date(post.created_at)).fromNow()}</span>
      </div>
    );
  }
}
