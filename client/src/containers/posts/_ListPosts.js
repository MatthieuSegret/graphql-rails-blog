import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PostPreview from 'containers/posts/_PostPreview';

class ListPosts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    postsCount: PropTypes.number,
    loadMorePosts: PropTypes.func
  };

  render() {
    const { posts, postsCount, loadMorePosts } = this.props;

    if (!posts) {
      return null;
    }

    return (
      <div className="posts">
        {posts.map(post => <PostPreview key={post.id} post={post} />)}

        {posts && posts.length < postsCount ? (
          <button className="button load-more" onClick={loadMorePosts}>
            Load more
          </button>
        ) : null}
      </div>
    );
  }
}

export default ListPosts;
