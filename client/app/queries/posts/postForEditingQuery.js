import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments as PostForEditingFragments } from 'containers/posts/EditPost';

export default function (WrappedComponent) {
  const GET_POST = gql`
    query getPost($id: ID) {
      post(id: $id) {
        ...PostForEditingFragment
      }
    }
    ${PostForEditingFragments.post}
  `;

  const withPostForEditing = graphql(GET_POST, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.params.id
      },
      forceFetch: true
    })
  });

  return withPostForEditing(WrappedComponent);
}
