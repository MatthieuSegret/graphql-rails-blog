import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import moment from 'moment';

import Loading from 'components/Loading';
import Comment from 'containers/comments/_Comment';
import NewComment from 'containers/comments/_NewComment';

import POST from 'graphql/posts/postQuery.graphql';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object
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
    const { post, loading } = this.props.data;
    if (loading) {
      return <Loading />;
    }

    return (
      <article className="post">
        <h2 className="post-heading">{post.title}</h2>
        <div className="post-meta">
          <span className="post-author">
            Posted by: <em>{post.author.name}</em>
          </span>
          <span className="post-date">{moment(new Date(post.created_at)).fromNow()}</span>
          <span className="post-count-comments">Comments: {post.comments_count}</span>
        </div>
        <div className="post-content">{post.content}</div>

        <div className="comments">
          <h4>Comments</h4>
          {this.listComments()}
          <NewComment postId={post.id} />
        </div>
      </article>
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

export default withPost(Post);
