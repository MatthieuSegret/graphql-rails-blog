import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import withFlashMessage from 'components/withFlashMessage';
import updateQueries from 'reducers/postsReducer';

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
          updateQueries
        }).then(onResult.bind(ownProps));
      }
    })
  });

  return withFlashMessage(withDestroyPost(WrappedComponent));
}
