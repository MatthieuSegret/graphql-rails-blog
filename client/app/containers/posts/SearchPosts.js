import React, { Component, PropTypes } from 'react';

import ListPosts from 'containers/posts/_ListPosts';
import SearchForm from 'containers/posts/_SearchForm';
import withPosts from 'queries/posts/postsQuery';

class SearchPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func,
    firstPostsLoading: PropTypes.bool,
    params: PropTypes.object
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.params.keywords !== this.props.params.keywords) {
      this.props.data.posts = [];
    }
  }

  render() {
    const { posts, postsCount, loading } = this.props.data;
    const { params: { keywords }, loadMorePosts, firstPostsLoading } = this.props;

    return (
      <div className="search-posts">
        <h1>Searching posts</h1>
        <div className="head-posts row">
          <div className="col-md-8">
            <SearchForm initialKeywords={keywords} loading={firstPostsLoading} />
          </div>
        </div>

        {(!firstPostsLoading && posts && posts.length === 0) ?
          <h3>Pas de résultats ...</h3>
        :
          <ListPosts posts={posts} postsCount={postsCount} loading={loading} loadMorePosts={loadMorePosts} />}
      </div>
    );
  }
}

export default withPosts(SearchPosts);
