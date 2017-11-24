import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';

export default function(WrappedComponent) {
  const REVOKE_TOKEN = gql`
    mutation revokeToken {
      revokeToken(input: {}) {
        errors {
          message
          attribute
        }
      }
    }
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.revokeToken.errors);
    if (errors && errors.base) {
      this.error(errors.base);
    }
    return response.data.revokeToken;
  }

  const withRevokeToken = graphql(REVOKE_TOKEN, {
    props: ({ ownProps, mutate }) => ({
      revokeToken() {
        return mutate()
          .then(onResult.bind(ownProps))
          .catch(error => {
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withRevokeToken(WrappedComponent));
}
