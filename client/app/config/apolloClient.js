import ApolloClient, { createNetworkInterface } from 'apollo-client';

const ROOT_URL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';
const networkInterface = createNetworkInterface({ uri: `${ROOT_URL}/graphql` });

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});
