import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/flash/withFlashMessage';
import { fragments } from 'containers/users/EditUserProfile';

export default function(WrappedComponent) {
  const UPDATE_USER = gql`
    mutation updateUser($name: String, $email: String) {
      updateUser(input: { name: $name, email: $email }) {
        user {
          ...UserForEditingFragment
        }
        errors {
          attribute
          message
        }
      }
    }
    ${fragments.user}
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.updateUser.errors);
    if (!errors) {
      this.redirect('/', { notice: 'User was successfully updated' });
    } else {
      const errorMsg = errors.base ? errors.base : '';
      this.error(`Please review the problems below: ${errorMsg}`);
    }
    return errors;
  }

  const withUpdateUser = graphql(UPDATE_USER, {
    props: ({ ownProps, mutate }) => ({
      updateUser(user) {
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

  return withFlashMessage(withUpdateUser(WrappedComponent));
}
