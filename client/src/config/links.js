import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';

import ROOT_URL from 'config/rootUrl';
import store from 'config/store';
import { error } from 'components/flash/flashActions';
import formatErrors from 'utils/errorsUtils';

export const batchHttpLink = new BatchHttpLink({
  uri: `${ROOT_URL}/graphql`,
  credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
});

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('blog:token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  store.dispatch(error("Oops, we're sorry, but something went wrong"));
});

export const formatErrorsLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const operationName = Object.keys(response.data);
    const payload = response.data[operationName] || null;
    if (payload && payload.errors && payload.errors.length > 0) {
      response.data[operationName].errors = formatErrors(payload.errors);
      const errors = response.data[operationName].errors;
      if (errors.base) {
        store.dispatch(error(errors.base));
      } else {
        store.dispatch(error('Please review the problems below:'));
      }
    }
    return response;
  });
});
