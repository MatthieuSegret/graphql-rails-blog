import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';
import updateQueries from 'reducers/postsReducer';

export default function (WrappedComponent) {
  const DESTROY_POST = gql`
    mutation destroyPost($id: ID) {
      destroyPost(input: { id: $id }) {
        post {
          id
        },
        errors {
          attribute,
          message
        }
      }
    }
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.destroyPost.errors);
    if (!errors) {
      this.notice('Post was successfully destroyed');
    } else {
      this.error(errors.base);
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
