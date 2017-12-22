import { graphql } from 'react-apollo';

import POSTS from 'graphql/posts/postsQuery.graphql';

// typings
import { PostsQuery, PostsQueryVariables } from 'types';

export default graphql<PostsQuery, PostsQueryVariables>(POSTS, {
  options: (ownProps: any) => ({
    variables: { keywords: ownProps.match.params.keywords }
  }),
  props: ({ data }) => {
    return {
      data,
      refetchPosts: data && data.refetch,
      loadMorePosts() {
        return (
          data &&
          data.fetchMore({
            variables: { offset: data.posts && data.posts.length },
            updateQuery(state, { fetchMoreResult }) {
              const { posts, postsCount } = fetchMoreResult as PostsQuery;
              if (!posts) return false;
              return {
                posts: [...state.posts, ...posts],
                postsCount
              };
            }
          })
        );
      }
    };
  }
});
