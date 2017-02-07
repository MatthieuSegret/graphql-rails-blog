import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class ChangeUserPassword extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    // Change user password
  }

  render() {
    return (
      <div className="change-user-password">
        <h1>Change user password</h1>
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="password" component={RenderField} type="password" hint="leave it blank if you don't want to change it" />
          <Field name="password_confirmation" component={RenderField} type="password" label="Password confirmation" />
          <Field name="current_password" component={RenderField} type="password" label="Current password" hint="we need your current password to confirm your changes" />
          <Button value="Update" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'ChangeUserPasswordForm'
})(ChangeUserPassword);
