import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments } from 'containers/users/EditUserProfile';

export default function (WrappedComponent) {
  const GET_USER_FOR_EDITING = gql`
    query getUserForEditing {
      currentUser {
        ...UserForEditingFragment
      }
    }
    ${fragments.user}
  `;

  const withUserForEditing = graphql(GET_USER_FOR_EDITING, {
    options: (ownProps) => ({
      forceFetch: true
    })
  });

  return withUserForEditing(WrappedComponent);
}
