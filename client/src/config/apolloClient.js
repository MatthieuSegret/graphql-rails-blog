import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import ROOT_URL from 'config/rootUrl';

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
      const token = localStorage.getItem('blog:token');
      if (token) req.options.headers.authorization = `Bearer ${token}`;
      next();
    }
  }
]);

export default new ApolloClient({
  networkInterface,
  queryDeduplication: true
});
