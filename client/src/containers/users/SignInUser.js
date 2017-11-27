import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import RenderField from 'components/form/RenderField';
import SubmitField from 'components/form/SubmitField';
import withFlashMessage from 'components/flash/withFlashMessage';
import withPosts from 'queries/postsQuery';
import withCurrentUser, { fetchCurrentUser } from 'queries/currentUserQuery';

import SIGN_IN from 'graphql/auth/signInMutation.graphql';

class SignInUser extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    signIn: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool,
    refetchPosts: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
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

    return this.props.signIn(values).then(response => {
      const payload = response.data.signIn;
      if (!payload.errors) {
        window.localStorage.setItem('blog:token', payload.token);
        fetchCurrentUser().then(() => {
          this.props.redirect('/', { notice: 'Signed in successfully.' });
        });
        this.props.refetchPosts();
      } else {
        window.localStorage.removeItem('blog:token');
        this.setState({ loading: false });
        this.props.change('SignInForm', 'password', '');
      }
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="columns">
        <div className="column is-offset-one-quarter is-half">
          <form onSubmit={this.props.handleSubmit(this.submitForm)}>
            <Field name="email" component={RenderField} />
            <Field name="password" type="password" component={RenderField} />
            <SubmitField value="Log in" cancel={false} loading={loading} />
          </form>
          <Link to="/users/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

const withSignIn = graphql(SIGN_IN, {
  props: ({ mutate }) => ({
    signIn(user) {
      return mutate({ variables: { ...user } });
    }
  })
});

export default compose(
  reduxForm({
    form: 'SignInForm'
  }),
  connect(null, { change }),
  withCurrentUser,
  withSignIn,
  withFlashMessage,
  withPosts
)(SignInUser);
