import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListPosts from 'containers/posts/_ListPosts';
import HeadListPosts from 'containers/posts/_HeadListPosts';
import withPosts from 'queries/posts/postsQuery';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func
  };

  render() {
    const { data: { posts, postsCount, loading }, loadMorePosts } = this.props;
    return (
      <div className="all-posts">
        <h1>Listing posts</h1>
        <HeadListPosts />
        <ListPosts
          posts={posts}
          postsCount={postsCount}
          loading={loading}
          loadMorePosts={loadMorePosts}
        />
      </div>
    );
  }
}

export default withPosts(AllPosts);
