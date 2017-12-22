import * as React from 'react';
import moment from 'moment';

// typings
import { CommentFragment } from 'types';

interface IProps {
  comment: CommentFragment;
}

export default class Comment extends React.Component<IProps, {}> {
  public render() {
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
