import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostPreviewFragments } from 'containers/posts/_PostPreview';
import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';

export default function (WrappedComponent) {
  const CREATE_POST = gql`
    mutation createPost($title: String, $content: String) {
      createPost(input: { title: $title, content: $content }) {
        newPost: post {
          ...PostPreviewFragment
        },
        errors {
          attribute,
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
      this.error('Please review the problems below:');
    }
    return errors;
  }

  const withCreatePost = graphql(CREATE_POST, {
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
        }).then(onResult.bind(ownProps)).catch((error) => {
          ownProps.error("Oops, we're sorry, but something went wrong");
        });
      }
    })
  });

  return withFlashMessage(withCreatePost(WrappedComponent));
}
