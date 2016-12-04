import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import Loading from 'components/Loading';
import Comment from 'containers/comments/_Comment';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.listComments = this.listComments.bind(this);
  }

  listComments() {
    const { comments } = this.props.data.post;
    if (!comments || comments.length === 0) { return null; }
    return comments.map((comment) => {
      return <Comment key={comment.id} comment={comment} />;
    });
  }

  render() {
    const { post, loading } = this.props.data;
    if (loading) { return <Loading />; }

    return (
      <article className="post">
        <h2 className="post-heading">
          { post.title }
        </h2>
        <div className="post-meta">
          <span className="post-author">
            Posted by: <em>{ post.author.name }</em>
          </span>
          <span className="post-date">
            { moment(new Date(post.created_at)).fromNow() }
          </span>
          <span className="post-count-comments">
            Comments: { post.comments_count }
          </span>
        </div>
        <div className="post-content">
          {post.content}
        </div>

        <div className="comments">
          <h4>Comments</h4>
          {this.listComments()}
        </div>
      </article>
    );
  }
}

const GET_POST = gql`
  query getPost($id: ID) {
    post(id: $id) {
      id,
      title,
      content,
      created_at,
      comments_count,
      author {
        name
      }
      comments {
        ...CommentFragment
      }
    }
  }
  ${Comment.fragments.comment}
`;

export default graphql(GET_POST, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(Post);
