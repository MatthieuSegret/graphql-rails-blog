import * as React from 'react';

import PostPreview from 'containers/posts/_PostPreview';

// typings
import { PostsQuery, PostPreviewFragment } from 'types';
import { ApolloQueryResult } from 'apollo-client/core/types';

interface IProps {
  posts: Array<PostPreviewFragment>;
  postsCount: number;
  loadMorePosts: () => ApolloQueryResult<PostsQuery>;
}

export default class ListPosts extends React.Component<IProps, {}> {
  public render() {
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
