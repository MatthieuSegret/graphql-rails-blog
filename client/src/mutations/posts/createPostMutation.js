import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostPreviewFragments } from 'containers/posts/_PostPreview';
import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/flash/withFlashMessage';
import updateQueries from 'reducers/postsReducer';

export default function(WrappedComponent) {
  const CREATE_POST = gql`
    mutation createPost($title: String, $content: String) {
      createPost(input: { title: $title, content: $content }) {
        newPost: post {
          ...PostPreviewFragment
        }
        errors {
          attribute
          message
        }
      }
    }
    ${PostPreviewFragments.post}
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.createPost.errors);
    if (!errors) {
      this.redirect('/', { notice: 'Post was successfully created' });
    } else {
      const errorMsg = errors.base ? errors.base : '';
      this.error(`Please review the problems below: ${errorMsg}`);
    }
    return errors;
  }

  const withCreatePost = graphql(CREATE_POST, {
    props: ({ ownProps, mutate }) => ({
      createPost(post) {
        return mutate({
          variables: { ...post },
          updateQueries
        })
          .then(onResult.bind(ownProps))
          .catch(error => {
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withCreatePost(WrappedComponent));
}
