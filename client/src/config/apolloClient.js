import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import ROOT_URL from 'config/rootUrl';
import { findToken } from 'utils/tokenUtils';

const networkInterface = createBatchingNetworkInterface({
  uri: `${ROOT_URL}/graphql`,
  opts: {
    credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
  }
});

networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      findToken()
        .then(token => {
          req.options.headers.authorization = token ? `Bearer ${token}` : null;
          next();
        })
        .catch(() => {
          next();
        });
    }
  }
]);

export default new ApolloClient({
  networkInterface,
  queryDeduplication: true
});
