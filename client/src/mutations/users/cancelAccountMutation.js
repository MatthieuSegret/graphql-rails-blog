import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import { removeToken } from 'utils/tokenUtils';
import withFlashMessage from 'components/withFlashMessage';

export default function(WrappedComponent) {
  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.cancelAccount.errors);
    if (errors) {
      const errorMsg = errors.base ? errors.base : '';
      this.error(`Please review the problems below: ${errorMsg}`);
    }
    return response.data.cancelAccount;
  }

  const withChangePassword = graphql(
    gql`
      mutation cancelAccount {
        cancelAccount(input: {}) {
          errors {
            attribute
            message
          }
        }
      }
    `,
    {
      props: ({ ownProps, mutate }) => ({
        cancelAccount(user) {
          return mutate()
            .then(onResult.bind(ownProps))
            .catch(error => {
              removeToken();
              ownProps.error("Oops, we're sorry, but something went wrong");
            });
        }
      })
    }
  );

  return withFlashMessage(withChangePassword(WrappedComponent));
}
