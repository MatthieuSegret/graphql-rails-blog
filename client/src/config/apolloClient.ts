import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DedupLink } from 'apollo-link-dedup';

import { authLink, formatErrorsLink, onErrorLink, batchHttpLink } from 'config/links';
import { flashMessageLocalLink } from 'components/flash/flashMessageLocalLink';

export default new ApolloClient({
  link: ApolloLink.from([
    new DedupLink(),
    flashMessageLocalLink,
    onErrorLink,
    authLink,
    formatErrorsLink,
    batchHttpLink
  ]),
  cache: new InMemoryCache()
});
