import * as React from 'react';
import { compose } from 'react-apollo';

import withPosts from 'queries/postsQuery';
import HeadListPosts from 'containers/posts/_HeadListPosts';
import ListPosts from 'containers/posts/_ListPosts';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import { PostsQuery } from 'types';

interface IProps {
  data: PostsQuery;
  match: any;
  loadMorePosts: () => ApolloQueryResult<PostsQuery>;
}

class SearchPosts extends React.Component<IProps, {}> {
  public componentWillUpdate(nextProps: IProps) {
    if (nextProps.match.params.keywords !== this.props.match.params.keywords) {
      this.props.data.posts = [];
    }
  }

  public render() {
    const { data: { posts, postsCount }, loadMorePosts } = this.props;
    const { params: { keywords } } = this.props.match;

    if (!posts) {
      return null;
    }

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

export default compose(withPosts)(SearchPosts);
