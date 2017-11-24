import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DedupLink } from 'apollo-link-dedup';

import { authLink, formatErrorsLink, errorLink, batchHttpLink } from 'config/links';

export default new ApolloClient({
  link: ApolloLink.from([new DedupLink(), errorLink, authLink, formatErrorsLink, batchHttpLink]),
  cache: new InMemoryCache()
});
