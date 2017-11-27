import { graphql } from 'react-apollo';

import POSTS from 'graphql/posts/postsQuery.graphql';

export default graphql(POSTS, {
  options: ownProps => ({
    variables: { keywords: ownProps.match.params.keywords }
  }),
  props: ({ data }) => {
    return {
      data,
      refetchPosts: data.refetch,
      loadMorePosts() {
        return data.fetchMore({
          variables: { offset: data.posts.length },
          updateQuery(state, { fetchMoreResult }) {
            const { posts, postsCount } = fetchMoreResult;
            return {
              posts: [...state.posts, ...posts],
              postsCount
            };
          }
        });
      }
    };
  }
});
