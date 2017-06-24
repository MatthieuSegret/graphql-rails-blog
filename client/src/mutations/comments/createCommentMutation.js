import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import shortid from 'shortid';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';
import { fragments as CommentFragments } from 'containers/comments/_Comment';
import updateQueries from 'reducers/commentsReducer';

export default function (WrappedComponent) {
  const CREATE_COMMENT = gql`
    mutation createComment($postId: ID, $content: String) {
      createComment(input: { postId: $postId, content: $content }) {
        newComment: comment {
          ...CommentFragment
        },
        errors {
          attribute,
          message
        }
      }
    }
    ${CommentFragments.comment}
  `;

  function onResult(response) {
    return response.errors || formatErrors(response.data.createComment.errors);
  }

  const withCreateComment = graphql(CREATE_COMMENT, {
    props: ({ ownProps, mutate }) => ({
      createComment(postId, comment) {
        return mutate({
          variables: { postId, ...comment },
          updateQueries,
          optimisticResponse: {
            __typename: 'Mutation',
            createComment: {
              __typename: 'Post',
              newComment: {
                __typename: 'Comment',
                id: shortid.generate(),
                content: comment.content,
                created_at: +(new Date()),
                pending: true,
                author: {
                  __typename: 'User',
                  name: ownProps.currentUser.name
                }
              },
              errors: null
            }
          }
        }).then(onResult.bind(ownProps)).catch((error) => {
          console.log(error);
          ownProps.error("Oops, we're sorry, but something went wrong");
        });
      }
    })
  });

  return withFlashMessage(withCreateComment(WrappedComponent));
}
