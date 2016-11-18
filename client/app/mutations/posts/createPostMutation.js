import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostPreviewFragments } from 'containers/posts/_PostPreview';

const CREATE_POST = gql`
  mutation createPost($title: String, $content: String) {
    createPost(input: { title: $title, content: $content }) {
      newPost: post {
        ...PostPreviewFragment
      }
    }
  }
  ${PostPreviewFragments.post}
`;

export default graphql(CREATE_POST, {
  props: ({ ownProps, mutate }) => ({
    createPost(post) {
      return mutate({
        variables: { ...post },
        updateQueries: {
          posts: (state, { mutationResult, queryVariables }) => {
            const newPost = mutationResult.data.createPost.newPost;
            if (!newPost) { return null; }
            return {
              posts: [newPost, ...state.posts],
              postsCount: state.postsCount + 1
            };
          }
        }
      });
    }
  })
});
