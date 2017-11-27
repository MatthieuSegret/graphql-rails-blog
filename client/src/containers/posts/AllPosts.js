import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListPosts from 'containers/posts/_ListPosts';
import HeadListPosts from 'containers/posts/_HeadListPosts';
import withPosts from 'queries/postsQuery';

class AllPosts extends Component {
  static propTypes = {
    data: PropTypes.object,
    loadMorePosts: PropTypes.func
  };

  render() {
    const { data: { posts, postsCount }, loadMorePosts } = this.props;
    const { params: { keywords } } = this.props.match;

    return (
      <div className="all-posts">
        <h1 className="title is-3 has-text-centered">Listing posts</h1>
        <hr />

        <HeadListPosts keywords={keywords} />
        <ListPosts posts={posts} postsCount={postsCount} loadMorePosts={loadMorePosts} />
      </div>
    );
  }
}

export default withPosts(AllPosts);
