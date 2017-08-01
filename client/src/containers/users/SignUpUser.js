import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, change } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withFlashMessage from 'components/withFlashMessage';
import withPosts from 'queries/posts/postsQuery';
import withSignUp from 'mutations/users/signUpMutation';

class SignUpUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    change: PropTypes.func,
    error: PropTypes.func,
    handleSubmit: PropTypes.func,
    signUp: PropTypes.func,
    refetchPosts: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { signUp } = this.props;
    return signUp(values).then((errors) => {
      if (!errors) {
        this.props.refetchPosts();
        this.props.redirect('/', { notice: 'Welcome! You have signed up successfully.' });
      } else {
        this.props.change('SignUpForm', 'password', '');
        this.props.change('SignUpForm', 'password_confirmation', '');
        this.props.error('Please review the problems below:');
        throw new SubmissionError(errors);
      }
    });
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
})(connect(null, { change })(withSignUp(withFlashMessage(withPosts(SignUpUser)))));
