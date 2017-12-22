import * as React from 'react';
import { compose } from 'react-apollo';

import ListPosts from 'containers/posts/_ListPosts';
import HeadListPosts from 'containers/posts/_HeadListPosts';
import withPosts from 'queries/postsQuery';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { PostsQuery } from 'types';

interface IProps {
  data: PostsQuery;
  match: any;
  loadMorePosts: () => ApolloQueryResult<PostsQuery>;
}

class AllPosts extends React.Component<IProps, {}> {
  public render() {
    const { data: { posts, postsCount }, loadMorePosts } = this.props;
    const { params: { keywords } } = this.props.match;

    if (!posts) {
      return null;
    }

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

export default compose(withPosts)(AllPosts);
