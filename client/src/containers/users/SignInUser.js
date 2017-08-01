import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError, change } from 'redux-form';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { Link } from 'react-router-dom';

import axios from 'config/axios';
import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withFlashMessage from 'components/withFlashMessage';
import { fetchCurrentUser } from 'queries/users/currentUserQuery';

class SignInUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    client: PropTypes.object,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    error: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.redirectIfUserIsAuthenticated = this.redirectIfUserIsAuthenticated.bind(this);
  }

  componentWillMount() {
    this.redirectIfUserIsAuthenticated();
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfUserIsAuthenticated(nextProps);
  }

  redirectIfUserIsAuthenticated(props = null) {
    const { currentUser, currentUserLoading } = props || this.props;
    if (!currentUserLoading && currentUser) {
      this.props.redirect('/', { error: 'You are already signed in.' });
    }
  }

  submitForm(values) {
    return axios.post('/users/sign_in', { user: values }).then((response) => {
      if (response.status === 201) {
        this.props.client.resetStore();
        fetchCurrentUser().then(() => {
          this.props.redirect('/', { notice: 'Signed in successfully.' });
        });
      }
    }).catch((err) => {
      console.log(err);
      this.props.change('SignInForm', 'password', '');
      this.props.error('Invalid Email or password.');
      throw new SubmissionError({ _error: 'Login failed' });
    });
  }

  render() {
    return (
      <div className="users-signin">
        <form onSubmit={this.props.handleSubmit(this.submitForm)}>
          <Field name="email" component={RenderField} type="text" />
          <Field name="password" component={RenderField} type="password" />
          <Button value="Log in" />
        </form>
        <Link to="/users/signup">Sign up</Link>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SignInForm'
})(connect(null, { change })(withFlashMessage(withApollo(SignInUser))));
