import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import client from 'config/apolloClient';

const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      name
      email
    }
  }
`;

export function fetchCurrentUser() {
  return client.query({ query: CURRENT_USER, fetchPolicy: 'network-only' });
}

export default graphql(CURRENT_USER, {
  props: ({ ownProps, data: { currentUser, loading } }) => ({
    currentUser,
    currentUserLoading: loading
  })
});
