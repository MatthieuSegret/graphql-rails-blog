import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostPreviewFragments } from 'containers/posts/_PostPreview';

const GET_POSTS = gql`
  query posts($offset: Int, $keywords: String) {
    postsCount(keywords: $keywords)
    posts(offset: $offset, keywords: $keywords) {
      ...PostPreviewFragment
    }
  }
  ${PostPreviewFragments.post}
`;

export default graphql(GET_POSTS, {
  options: (ownProps) => ({
    variables: { offset: 0, keywords: ownProps.params.keywords }
  }),
  props: ({ data }) => {
    const { variables: { offset }, loading } = data;
    const firstPostsLoading = (loading && offset === 0);
    return {
      data,
      firstPostsLoading,
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
    };
  }
});
