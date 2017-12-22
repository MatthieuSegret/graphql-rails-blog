import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import { required } from 'components/form/validation';

import USER_FOR_EDITING from 'graphql/users/userForEditingQuery.graphql';
import UPDATE_USER from 'graphql/users/updateUserMutation.graphql';
import CANCEL_ACCOUNT from 'graphql/users/cancelAccountMutation.graphql';

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import {
  FlashMessageVariables,
  CancelAccountMutation,
  UpdateUserMutationVariables,
  UpdateUserMutation,
  GetUserForEditingQuery,
  MutationState,
  MutationStateProps,
  User
} from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  handleSubmit: (event: any) => void;
  cancelAccount: () => Promise<ApolloQueryResult<CancelAccountMutation>>;
  updateUser: ({  }: UpdateUserMutationVariables) => Promise<ApolloQueryResult<UpdateUserMutation>>;
  data: GetUserForEditingQuery;
  mutation: MutationState;
}

class EditUserProfile extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.onCancelAccount = this.onCancelAccount.bind(this);
  }

  private async submitForm(values: any) {
    const { data: { updateUser: { errors } } } = await this.props.updateUser(values);
    if (!errors) {
      this.props.redirect('/', { notice: 'User was successfully updated' });
    } else {
      return errors;
    }
  }

  private async onCancelAccount() {
    if (window.confirm('Are you sure ?')) {
      const { data: { cancelAccount: { errors } } } = await this.props.cancelAccount();
      if (!errors) {
        window.localStorage.removeItem('blog:token');
        (window as any).location = '/';
      }
    }
  }

  public render() {
    const { mutation: { loading }, data: { currentUser } } = this.props;

    return (
      <div className="edit-user-profile">
        <div className="columns">
          <div className="column is-offset-one-quarter is-half">
            <h1 className="title is-2">Edit profile</h1>
            <Form
              onSubmit={this.submitForm}
              initialValues={currentUser}
              render={({ handleSubmit, pristine }: any) => (
                <form onSubmit={handleSubmit}>
                  <Field name="name" component={RenderField} validate={required} />
                  <Field name="email" component={RenderField} validate={required} />
                  <SubmitField loading={loading} disabled={pristine} value="Update" />
                </form>
              )}
            />

            <div className="change-password">
              <h3 className="title is-4">Password</h3>
              <Link to="/users/password/edit" className="change-password-link">
                <span className="icon">
                  <i className="fa fa-pencil" />
                </span>
                Change password
              </Link>
            </div>

            <div className="cancel-account">
              <h3 className="title is-4">Cancel my account</h3>
              <a onClick={this.onCancelAccount}>
                <span className="icon">
                  <i className="fa fa-trash-o" />
                </span>
                Cancel my account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const withUserForEditing = graphql(USER_FOR_EDITING, {
  options: () => ({
    fetchPolicy: 'network-only'
  })
});

const withUpdateUser = graphql<UpdateUserMutation, UpdateUserMutationVariables & MutationStateProps>(UPDATE_USER, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    updateUser(user: User) {
      return wrapMutate(mutate!({ variables: { ...user } }));
    }
  })
});

const withCancelAccount = graphql<CancelAccountMutation>(CANCEL_ACCOUNT, {
  props: ({ mutate }) => ({
    cancelAccount() {
      return mutate!({});
    }
  })
});

export default compose(
  withUserForEditing,
  withFlashMessage,
  withCancelAccount,
  withMutationState({ wrapper: true, propagateError: true }),
  withUpdateUser
)(EditUserProfile);
