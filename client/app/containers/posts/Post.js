import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import Loading from 'components/Loading';

class Post extends Component {
  static propTypes = {
    data: PropTypes.object
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
        </div>
        <div className="post-content">
          {post.content}
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
      author {
        name
      }
    }
  }
`;

export default graphql(GET_POST, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(Post);
