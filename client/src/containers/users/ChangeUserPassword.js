import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import withFlashMessage from 'components/flash/withFlashMessage';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

import CHANGE_USER_PASSWORD from 'graphql/users/changeUserPasswordMutation.graphql';

class ChangeUserPassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func,
    change: PropTypes.func,
    handleSubmit: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.changePassword(values).then(response => {
      const errors = response.data.changePassword.errors;
      if (!errors) {
        this.props.redirect('/', { notice: 'User password was successfully updated' });
      } else {
        this.setState({ loading: false });
        throw new SubmissionError(errors);
      }
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="change-user-password">
        <h1>Change password</h1>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field
            name="current_password"
            component={RenderField}
            type="password"
            label="Current password"
            hint="we need your current password to confirm your changes"
          />
          <Field name="password" component={RenderField} type="password" label="New password" />
          <Field name="password_confirmation" component={RenderField} type="password" label="Password confirmation" />
          <Button loading={loading} value="Update" />
        </form>
      </div>
    );
  }
}

const withChangeUserPassword = graphql(CHANGE_USER_PASSWORD, {
  props: ({ mutate }) => ({
    changePassword(user) {
      return mutate({ variables: { ...user } });
    }
  })
});

export default reduxForm({
  form: 'ChangeUserPasswordForm'
})(withFlashMessage(withChangeUserPassword(ChangeUserPassword)));
