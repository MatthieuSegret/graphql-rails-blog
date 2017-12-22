import { graphql } from 'react-apollo';
import client from 'config/apolloClient';

import CURRENT_USER from 'graphql/users/currentUserQuery.graphql';

// typings
import { CurrentUserQuery } from 'types';

export function fetchCurrentUser() {
  return client.query({ query: CURRENT_USER, fetchPolicy: 'network-only' });
}

export default graphql<CurrentUserQuery>(CURRENT_USER, {
  props: ({ data: { currentUser, loading } }: any) => ({
    currentUser,
    currentUserLoading: loading
  })
});
