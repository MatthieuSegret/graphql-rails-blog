import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';
import { fragments } from 'containers/posts/EditPost';

export default function(WrappedComponent) {
  const UPDATE_POST = gql`
    mutation updatePost($id: ID, $title: String, $content: String) {
      updatePost(input: { id: $id, title: $title, content: $content }) {
        post {
          ...PostForEditingFragment
        }
        errors {
          attribute
          message
        }
      }
    }
    ${fragments.post}
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.updatePost.errors);
    if (!errors) {
      this.redirect('/', { notice: 'Note was successfully updated' });
    } else {
      const errorMsg = errors.base ? errors.base : '';
      this.error(`Please review the problems below: ${errorMsg}`);
    }
    return errors;
  }

  const withUpdatePost = graphql(UPDATE_POST, {
    props: ({ ownProps, mutate }) => ({
      updatePost(post) {
        return mutate({
          variables: { ...post }
        })
          .then(onResult.bind(ownProps))
          .catch(error => {
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withUpdatePost(WrappedComponent));
}
