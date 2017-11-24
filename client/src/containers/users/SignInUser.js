import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import RenderField from 'components/form/RenderField';
import Button from 'components/form/Button';
import withFlashMessage from 'components/flash/withFlashMessage';
import withSignIn from 'mutations/auth/signInMutation';
import withCurrentUser from 'queries/users/currentUserQuery';

class SignInUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    signIn: PropTypes.func,
    error: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  };

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
    this.setState({ loading: true });

    return this.props.signIn(values).then(error => {
      if (error) {
        this.setState({ loading: false });
        this.props.change('SignInForm', 'password', '');
      }
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

export default compose(
  reduxForm({
    form: 'SignInForm'
  }),
  connect(null, { change }),
  withCurrentUser,
  withSignIn,
  withFlashMessage
)(SignInUser);
