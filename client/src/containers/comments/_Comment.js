import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object
  };

  render() {
    const { comment } = this.props;

    return (
      <div className={'comment'}>
        <div className="comment-content">{comment.content}</div>
        <div className="comment-meta">
          <span className="comment-author">
            Commented by: <em>{comment.author.name}</em>
          </span>
          <span className="date">{moment(new Date(comment.created_at)).fromNow()}</span>
        </div>
      </div>
    );
  }
}
