import React, { Component, PropTypes } from 'react';

import ListPosts from 'containers/posts/_ListPosts';
import SearchForm from 'containers/posts/_SearchForm';
import withPosts from 'queries/posts/postsQuery';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func
  }

  render() {
    const { data: { posts, postsCount, loading }, loadMorePosts } = this.props;
    return (
      <div className="all-posts">
        <h1>Listing posts</h1>
        <div className="head-posts row">
          <div className="col-md-8">
            <SearchForm />
          </div>
        </div>
        <ListPosts posts={posts} postsCount={postsCount} loading={loading} loadMorePosts={loadMorePosts} />
      </div>
    );
  }
}

export default withPosts(AllPosts);
