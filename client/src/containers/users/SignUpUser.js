import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError, change } from 'redux-form';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withFlashMessage from 'components/flash/withFlashMessage';
import withPosts from 'queries/postsQuery';

import SIGN_UP from 'graphql/users/signUpMutation.graphql';
import CURRENT_USER from 'graphql/users/currentUserQuery.graphql';

class SignUpUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    change: PropTypes.func,
    error: PropTypes.func,
    handleSubmit: PropTypes.func,
    signUp: PropTypes.func,
    refetchPosts: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(values) {
    const { signUp } = this.props;
    this.setState({ loading: true });
    return signUp(values).then(response => {
      const payload = response.data.signUp;
      if (!payload.errors) {
        window.localStorage.setItem('blog:token', payload.currentUser.token);
        this.props.refetchPosts();
        this.props.redirect('/', { notice: 'Welcome! You have signed up successfully.' });
      } else {
        this.setState({ loading: false });
        this.props.change('SignUpForm', 'password', '');
        this.props.change('SignUpForm', 'password_confirmation', '');
        throw new SubmissionError(payload.errors);
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
  if (!values.name) {
    errors.name = "can't be blank";
  }
  if (!values.email) {
    errors.email = "can't be blank";
  }
  return errors;
}

const withSignUp = graphql(SIGN_UP, {
  props: ({ mutate }) => ({
    signUp(user) {
      return mutate({
        variables: { ...user },
        update: (store, { data: { signUp: { currentUser } } }) => {
          if (!currentUser) return false;
          const data = store.readQuery({ query: CURRENT_USER });
          data.currentUser = currentUser;
          store.writeQuery({ query: CURRENT_USER, data });
        }
      });
    }
  })
});

export default reduxForm({
  form: 'SignUpForm',
  validate
})(connect(null, { change })(withSignUp(withFlashMessage(withPosts(SignUpUser)))));
