import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostPreviewFragments } from 'containers/posts/_PostPreview';

const GET_POSTS = gql`
  query posts($offset: Int) {
    postsCount
    posts(offset: $offset) {
      ...PostPreviewFragment
    }
  }
  ${PostPreviewFragments.post}
`;

export default graphql(GET_POSTS, {
  props: ({ data }) => ({
    data,
    loadMorePosts() {
      return data.fetchMore({
        variables: { offset: data.posts.length },
        updateQuery: (state, { fetchMoreResult }) => {
          const { posts, postsCount } = fetchMoreResult.data;
          return {
            posts: [...state.posts, ...posts],
            postsCount
          };
        }
      });
    }
  })
});
