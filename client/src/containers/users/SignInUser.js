import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withMutationState from 'apollo-mutation-state';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

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
    refetchPosts: PropTypes.func,
    mutation: PropTypes.object
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

  async submitForm(values) {
    const { data: { signIn: payload } } = await this.props.signIn(values);
    if (!payload.errors) {
      window.localStorage.setItem('blog:token', payload.token);
      await fetchCurrentUser();
      this.props.refetchPosts();
      this.props.redirect('/', { notice: 'Signed in successfully.' });
    } else {
      window.localStorage.removeItem('blog:token');
      this.signInForm.form.change('password', '');
    }
  }

  render() {
    const { mutation: { loading } } = this.props;

    return (
      <div className="columns">
        <div className="column is-offset-one-quarter is-half">
          <Form
            onSubmit={this.submitForm}
            ref={input => {
              this.signInForm = input;
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field name="email" component={RenderField} type="text" />
                <Field name="password" component={RenderField} type="password" />
                <SubmitField value="Log in" cancel={false} loading={loading} />
              </form>
            )}
          />
          <Link to="/users/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

const withSignIn = graphql(SIGN_IN, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    signIn(user) {
      return wrapMutate(mutate({ variables: { ...user } }));
    }
  })
});

export default compose(
  withCurrentUser,
  withMutationState({ wrapper: true, propagateError: true }),
  withSignIn,
  withFlashMessage,
  withPosts
)(SignInUser);
