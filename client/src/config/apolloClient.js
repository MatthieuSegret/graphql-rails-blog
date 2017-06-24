import ApolloClient, { createNetworkInterface } from 'apollo-client';
import ROOT_URL from 'config/rootUrl';

const networkInterface = createNetworkInterface({
  uri: `${ROOT_URL}/graphql`,
  opts: {
    credentials: (process.env.NODE_ENV === 'development') ? 'include' : 'same-origin'
  }
});

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});
