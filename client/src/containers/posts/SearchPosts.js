import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withPosts from 'queries/postsQuery';
import HeadListPosts from 'containers/posts/_HeadListPosts';
import ListPosts from 'containers/posts/_ListPosts';

class SearchPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    match: PropTypes.object
  };

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.match.params.keywords !== this.props.match.params.keywords) {
      this.props.data.posts = [];
    }
  }

  render() {
    const { data: { posts, postsCount }, loadMorePosts } = this.props;
    const { params: { keywords } } = this.props.match;

    return (
      <div className="search-posts">
        <h1 className="title is-3 has-text-centered">Search: {keywords}</h1>
        <hr />

        <HeadListPosts keywords={keywords} />

        {posts && posts.length === 0 ? (
          <h3>No results ...</h3>
        ) : (
          <ListPosts posts={posts} postsCount={postsCount} loadMorePosts={loadMorePosts} />
        )}
      </div>
    );
  }
}

export default withPosts(SearchPosts);
