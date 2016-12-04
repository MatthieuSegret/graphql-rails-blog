import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from 'components/Loading';
import PostPreview from 'containers/posts/_PostPreview';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.postsPreview = this.postsPreview.bind(this);
  }

  postsPreview() {
    const { posts } = this.props.data;
    if (!posts) { return null; }
    return posts.map((post) => {
      return <PostPreview key={post.id} post={post} />;
    });
  }

  render() {
    const { data: { posts, postsCount, loading }, loadMorePosts } = this.props;
    return (
      <div className="all-posts">
        <h1>Listing posts</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>Created at</th>
            </tr>
          </thead>

          <tbody>
            {this.postsPreview()}
          </tbody>
        </table>

        {loading ? <Loading /> : null}

        {(posts && posts.length < postsCount) ?
          <button className="btn btn-sm btn-default center-block load-more" onClick={loadMorePosts}>Load more</button> : null}
      </div>
    );
  }
}

const GET_POSTS = gql`
  query posts($offset: Int) {
    postsCount
    posts(offset: $offset) {
      ...PostPreviewFragment
    }
  }
  ${PostPreview.fragments.post}
`;

export default graphql(GET_POSTS, {
  props: ({ data }) => ({
    data,
    loadMorePosts() {
      return data.fetchMore({
        variables: { offset: data.posts.length },
        updateQuery: (state, { fetchMoreResult }) => {
          const { posts, postsCount } = fetchMoreResult.data;
          return {
            posts: [...state.posts, ...posts],
            postsCount
          };
        }
      });
    }
  })
})(AllPosts);
