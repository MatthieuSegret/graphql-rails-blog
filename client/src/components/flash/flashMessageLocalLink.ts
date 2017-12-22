import { withClientState } from 'apollo-link-state';

import FLASH_MESSAGE from 'graphql/flash/flashMessageQuery.graphql';

// typings
import { DataProxy } from 'apollo-cache';
import { FlashMessage } from 'types';

export const flashMessageLocalLink = withClientState({
  Query: {
    // provide an initial state
    message: () => null
  },
  Mutation: {
    // update values in the store on mutations
    createFlashMessage(_: any, { type, text }: FlashMessage, { cache }: { cache: DataProxy }) {
      const data = {
        message: { type, text, __typename: 'FlashMessage' }
      };
      cache.writeQuery({ query: FLASH_MESSAGE, data });
      return null;
    },
    deleteFlashMessage(_: any, {}, { cache }: { cache: DataProxy }) {
      const data = {
        message: null
      };
      cache.writeQuery({ query: FLASH_MESSAGE, data });
      return null;
    }
  }
});
