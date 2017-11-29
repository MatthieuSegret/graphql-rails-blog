import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Form, Field } from 'react-final-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';

import CHANGE_USER_PASSWORD from 'graphql/users/changeUserPasswordMutation.graphql';

class ChangeUserPassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func,
    error: PropTypes.func,
    handleSubmit: PropTypes.func,
    mutation: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values) {
    const { data: { changePassword: { errors } } } = await this.props.changePassword(values);
    if (!errors) {
      this.props.redirect('/', { notice: 'User password was successfully updated' });
    } else {
      this.changePasswordForm.form.change('current_password', '');
      this.changePasswordForm.form.change('password', '');
      this.changePasswordForm.form.change('password_confirmation', '');
      return errors;
    }
  }

  render() {
    const { mutation: { loading } } = this.props;

    return (
      <div className="change-user-password">
        <div className="columns">
          <div className="column is-offset-one-quarter is-half">
            <h1 className="title is-3">Changer votre mot de passe</h1>
            <Form
              onSubmit={this.submitForm}
              ref={input => {
                this.changePasswordForm = input;
              }}
              render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="current_password" label="Current password" type="password" component={RenderField} />
                  <Field name="password" label="New password" type="password" component={RenderField} />
                  <Field
                    name="password_confirmation"
                    label="Confirm your password"
                    type="password"
                    component={RenderField}
                  />
                  <SubmitField loading={loading} disabled={pristine} value="Update" />
                </form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const withChangeUserPassword = graphql(CHANGE_USER_PASSWORD, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    changePassword(user) {
      return wrapMutate(mutate({ variables: { ...user } }));
    }
  })
});

export default compose(
  withMutationState({ wrapper: true, propagateError: true }),
  withChangeUserPassword,
  withFlashMessage
)(ChangeUserPassword);
