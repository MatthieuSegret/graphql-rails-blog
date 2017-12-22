import * as React from 'react';
import { graphql, compose } from 'react-apollo';

import PostInfos from 'containers/posts/_PostInfos';
import PostActions from 'containers/posts/_PostActions';
import Comment from 'containers/comments/_Comment';
import NewComment from 'containers/comments/_NewComment';
import withCurrentUser from 'queries/currentUserQuery';

import POST from 'graphql/posts/postQuery.graphql';

// typings
import { PostQuery, User, PostFragment, CommentFragment } from 'types';

interface IProps {
  data: PostQuery;
  currentUser: User;
}

class Post extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.listComments = this.listComments.bind(this);
  }

  private listComments(post: PostFragment) {
    const { comments } = post;
    if (!comments || comments.length === 0) {
      return null;
    }
    return comments.map((comment: CommentFragment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
  }

  public render() {
    const { data: { post }, currentUser } = this.props;
    if (!post) {
      return null;
    }

    return (
      <div className="post-show post">
        <div className="title-wrapper">
          <h1 className="title is-3">{post.title}</h1>

          {currentUser && currentUser.id === post.author.id ? <PostActions post={post} /> : null}
          <PostInfos post={post} />
          <hr />
        </div>

        <div className="content post-content">{post.content}</div>
        <div className="comments">
          <h4 className="title is-5">Comments</h4>
          {this.listComments(post)}
          <NewComment postId={post.id} />
        </div>
      </div>
    );
  }
}

const withPost = graphql(POST, {
  options: (ownProps: any) => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
});

export default compose(withCurrentUser, withPost)(Post);
