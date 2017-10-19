import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';

export default function(WrappedComponent) {
  const REVOKE_REFRESH_TOKEN = gql`
    mutation revokeRefreshToken {
      revokeRefreshToken(input: {}) {
        errors {
          message
          attribute
        }
      }
    }
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.revokeRefreshToken.errors);
    if (errors && errors.base) {
      this.error(errors.base);
    }
    return response.data.revokeRefreshToken;
  }

  const withRevokeRefreshToken = graphql(REVOKE_REFRESH_TOKEN, {
    props: ({ ownProps, mutate }) => ({
      revokeRefreshToken() {
        return mutate()
          .then(onResult.bind(ownProps))
          .catch(error => {
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withRevokeRefreshToken(WrappedComponent));
}
