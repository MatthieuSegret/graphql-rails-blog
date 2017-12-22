import * as React from 'react';
import moment from 'moment';

// typings
import { PostPreviewFragment } from 'types';

interface IProps {
  post: PostPreviewFragment;
}

export default class PostInfos extends React.Component<IProps, {}> {
  public render() {
    const { post } = this.props;

    return (
      <div className="post-info">
        <span className="post-author">By {post.author.name}</span> -
        <span className="post-date"> {moment(new Date(post.created_at)).fromNow()}</span>
      </div>
    );
  }
}
