import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import formatErrors from 'utils/errorsUtils';
import withFlashMessage from 'components/withFlashMessage';
import updateQueries from 'reducers/usersReducer';

export default function(WrappedComponent) {
  const SIGN_UP = gql`
    mutation signUp($name: String, $email: String, $password: String, $password_confirmation: String) {
      signUp(
        input: { name: $name, email: $email, password: $password, password_confirmation: $password_confirmation }
      ) {
        currentUser: user {
          name
          email
          token
        }
        errors {
          attribute
          message
        }
      }
    }
  `;

  function onResult(response) {
    const errors = response.errors || formatErrors(response.data.signUp.errors);
    if (!errors) {
      const token = response.data.signUp.currentUser.token;
      if (token) window.localStorage.setItem('blog:token', token);
    }
    return errors;
  }

  const withSignUp = graphql(SIGN_UP, {
    props: ({ ownProps, mutate }) => ({
      signUp(user) {
        return mutate({
          variables: { ...user },
          updateQueries
        })
          .then(onResult.bind(ownProps))
          .catch(error => {
            console.log(error);
            ownProps.error("Oops, we're sorry, but something went wrong");
          });
      }
    })
  });

  return withFlashMessage(withSignUp(WrappedComponent));
}
