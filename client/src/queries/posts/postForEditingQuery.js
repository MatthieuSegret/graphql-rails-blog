import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments } from 'containers/posts/EditPost';

export default function (WrappedComponent) {
  const GET_POST = gql`
    query getPost($id: ID) {
      post(id: $id) {
        ...PostForEditingFragment
      }
    }
    ${fragments.post}
  `;

  const withPostForEditing = graphql(GET_POST, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.match.params.id
      },
      fetchPolicy: 'network-only'
    })
  });

  return withPostForEditing(WrappedComponent);
}
