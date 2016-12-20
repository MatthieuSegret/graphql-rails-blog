import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import withFlashMessage from 'components/withFlashMessage';

export default function (WrappedComponent) {
  const DESTROY_POST = gql`
    mutation destroyPost($id: ID) {
      destroyPost(input: { id: $id }) {
        post {
          id
        }
      }
    }
  `;

  function onResult(response) {
    if (!response.errors) {
      this.notice('Post was successfully destroyed');
    }
  }

  const withDestroyPost = graphql(DESTROY_POST, {
    props: ({ ownProps, mutate }) => ({

      destroyPost(postID) {
        return mutate({
          variables: { id: postID },
          updateQueries: {
            posts: (state, { mutationResult, queryVariables }) => {
              const postDestroyed = mutationResult.data.destroyPost.post;
              if (!postDestroyed) { return null; }
              return {
                posts: state.posts.filter(post => post.id !== postDestroyed.id),
                postsCount: state.postsCount - 1
              };
            }
          }
        }).then(onResult.bind(ownProps));
      }
    })
  });

  return withFlashMessage(withDestroyPost(WrappedComponent));
}
