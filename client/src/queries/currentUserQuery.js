import { graphql } from 'react-apollo';
import client from 'config/apolloClient';

import CURRENT_USER from 'graphql/users/currentUserQuery.graphql';

export function fetchCurrentUser() {
  return client.query({ query: CURRENT_USER, fetchPolicy: 'network-only' });
}

export default graphql(CURRENT_USER, {
  props: ({ ownProps, data: { currentUser, loading } }) => ({
    currentUser,
    currentUserLoading: loading
  })
});
