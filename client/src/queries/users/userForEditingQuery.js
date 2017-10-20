import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { fragments } from 'containers/users/EditUserProfile';

export default function(WrappedComponent) {
  const withUserForEditing = graphql(
    gql`
    query getUserForEditing {
      currentUser {
        ...UserForEditingFragment
      }
    }
    ${fragments.user}
  `,
    {
      options: ownProps => ({
        fetchPolicy: 'network-only'
      })
    }
  );

  return withUserForEditing(WrappedComponent);
}
