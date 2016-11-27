import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';

class SignUpUser extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    console.log('SignUpUser');
    console.log(values);
  }

  render() {
    return (
      <div className="users-signin">
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="name" component={RenderField} type="text" />
          <Field name="email" component={RenderField} type="text" />
          <Field name="password" component={RenderField} type="password" hint="6 characters minimum" />
          <Field name="password_confirmation" component={RenderField} type="password" label="Password confirmation" />
          <Button value="Sign up" />
        </form>
        <Link to="/users/signin">Log in</Link>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) { errors.name = "can't be blank"; }
  if (!values.email) { errors.email = "can't be blank"; }
  if (!values.password) { errors.password = "can't be blank"; }
  if (!values.password_confirmation) { errors.password_confirmation = "can't be blank"; }
  return errors;
}

export default reduxForm({
  form: 'SignUpForm',
  validate
})(SignUpUser);
