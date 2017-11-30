import { withClientState } from 'apollo-link-state';

import FLASH_MESSAGE from 'graphql/flash/flashMessageQuery.graphql';

export const flashMessageLocalLink = withClientState({
  Query: {
    // provide an initial state
    message: () => null
  },
  Mutation: {
    // update values in the store on mutations
    createFlashMessage(_, { type, text }, { cache }) {
      const data = {
        message: { type, text, __typename: 'FlashMessage' }
      };
      cache.writeQuery({ query: FLASH_MESSAGE, data });
      return null;
    },
    deleteFlashMessage(_, $, { cache }) {
      const data = {
        message: null
      };
      cache.writeQuery({ query: FLASH_MESSAGE, data });
      return null;
    }
  }
});
