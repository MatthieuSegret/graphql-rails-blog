import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import PostInfos from 'containers/posts/_PostInfos';
import PostActions from 'containers/posts/_PostActions';
import Comment from 'containers/comments/_Comment';
import NewComment from 'containers/comments/_NewComment';
import withCurrentUser from 'queries/currentUserQuery';

import POST from 'graphql/posts/postQuery.graphql';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object,
    currentUser: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.listComments = this.listComments.bind(this);
  }

  listComments() {
    const { comments } = this.props.data.post;
    if (!comments || comments.length === 0) {
      return null;
    }
    return comments.map(comment => {
      return <Comment key={comment.id} comment={comment} />;
    });
  }

  render() {
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
          {this.listComments()}
          <NewComment postId={post.id} />
        </div>
      </div>
    );
  }
}

const withPost = graphql(POST, {
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.id
    }
  })
});

export default withCurrentUser(withPost(Post));
