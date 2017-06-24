import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, change } from 'redux-form';

import withChangeUserPassword from 'mutations/users/changeUserPasswordMutation';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class ChangeUserPassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func,
    change: PropTypes.func,
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    this.setState({ loading: true });
    return this.props.changePassword(values).then((errors) => {
      if (errors) {
        this.setState({ loading: false });
        this.props.change('ChangeUserPasswordForm', 'password', '');
        this.props.change('ChangeUserPasswordForm', 'password_confirmation', '');
        this.props.change('ChangeUserPasswordForm', 'current_password', '');
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
          <Field name="password" component={RenderField} type="password" hint="leave it blank if you don't want to change it" />
          <Field name="password_confirmation" component={RenderField} type="password" label="Password confirmation" />
          <Field name="current_password" component={RenderField} type="password" label="Current password" hint="we need your current password to confirm your changes" />
          <Button loading={loading} value="Update" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ChangeUserPasswordForm'
})(connect(null, { change })(withChangeUserPassword(ChangeUserPassword)));
