import * as React from 'react';
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

// typings
import { ApolloQueryResult } from 'apollo-client/core/types';
import {
  FlashMessageVariables,
  SignInMutationVariables,
  SignInMutation,
  User,
  PostsQuery,
  MutationState,
  MutationStateProps
} from 'types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  handleSubmit: (event: any) => void;
  signIn: ({ email, password }: SignInMutationVariables) => Promise<ApolloQueryResult<SignInMutation>>;
  currentUser: User;
  currentUserLoading: boolean;
  refetchPosts: () => Promise<ApolloQueryResult<PostsQuery>>;
  mutation: MutationState;
}

class SignInUser extends React.Component<IProps, {}> {
  private signInForm: any;

  constructor(props: IProps) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.redirectIfUserIsAuthenticated = this.redirectIfUserIsAuthenticated.bind(this);
  }

  public componentWillMount() {
    this.redirectIfUserIsAuthenticated();
  }

  public componentWillReceiveProps(nextProps: IProps) {
    this.redirectIfUserIsAuthenticated(nextProps);
  }

  private redirectIfUserIsAuthenticated(props?: IProps) {
    const { currentUser, currentUserLoading } = props || this.props;
    if (!currentUserLoading && currentUser) {
      this.props.redirect('/', { error: 'You are already signed in.' });
    }
  }

  private async submitForm(values: any) {
    const { data: { signIn: payload } } = await this.props.signIn(values);
    if (!payload.errors && payload.token) {
      window.localStorage.setItem('blog:token', payload.token);
      await fetchCurrentUser();
      this.props.refetchPosts();
      this.props.redirect('/', { notice: 'Signed in successfully.' });
    } else {
      window.localStorage.removeItem('blog:token');
      this.signInForm.form.change('password', '');
    }
  }

  public render() {
    const { mutation: { loading } } = this.props;

    return (
      <div className="columns">
        <div className="column is-offset-one-quarter is-half">
          <Form
            onSubmit={this.submitForm}
            ref={(input: any) => {
              this.signInForm = input;
            }}
            render={({ handleSubmit }: any) => (
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

const withSignIn = graphql<SignInMutation, SignInMutationVariables & MutationStateProps>(SIGN_IN, {
  props: ({ mutate, ownProps: { wrapMutate } }) => ({
    signIn(user: SignInMutationVariables) {
      return wrapMutate(mutate!({ variables: { ...user } }));
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
