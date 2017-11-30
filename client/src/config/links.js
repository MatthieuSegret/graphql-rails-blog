import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { BatchHttpLink } from 'apollo-link-batch-http';

import ROOT_URL from 'config/rootUrl';
import formatErrors from 'utils/errorsUtils';
import client from 'config/apolloClient';

import CREATE_FLASH_MESSAGE from 'graphql/flash/createFlashMessageMutation.graphql';

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

export const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  error("Oops, we're sorry, but something went wrong");
});

export const formatErrorsLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // Add format errors properties to payload if an error is happend
    for (let operationName in response.data) {
      const payload = response.data[operationName];
      if (payload && payload.messages && payload.messages.length > 0) {
        response.data[operationName].errors = formatErrors(payload.messages);
        if (payload.errors.base) {
          error(payload.errors.base);
        } else {
          error('Please review the problems below:');
        }
      }
    }
    return response;
  });
});

const error = text => {
  client.mutate({ mutation: CREATE_FLASH_MESSAGE, variables: { type: 'error', text } });
};
