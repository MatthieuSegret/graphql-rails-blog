import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';

export default function(WrappedComponent) {
  const CHANGE_PASSWORD = gql`
    mutation changePassword($password: String, $password_confirmation: String, $current_password: String) {
      changePassword(
        input: {
          password: $password
          password_confirmation: $password_confirmation
          current_password: $current_password
        }
      ) {
        errors {
          attribute
          message
        }
      }
    }
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.changePassword.errors);
    if (!errors) {
      this.redirect('/', { notice: 'User password was successfully updated' });
    } else {
      const errorMsg = errors.base ? errors.base : '';
      this.error(`Please review the problems below: ${errorMsg}`);
    }
    return errors;
  }

  const withChangePassword = graphql(CHANGE_PASSWORD, {
    props: ({ ownProps, mutate }) => ({
      changePassword(user) {
        return mutate({
          variables: { ...user }
        })
          .then(onResult.bind(ownProps))
          .catch(error => {
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withChangePassword(WrappedComponent));
}
