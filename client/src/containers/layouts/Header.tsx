import * as React from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import withFlashMessage from 'components/flash/withFlashMessage';
import REVOKE_TOKEN from 'graphql/auth/revokeTokenMutation.graphql';

// typings
import { User, FlashMessageVariables, RevokeTokenMutation } from 'types';
import { ApolloQueryResult } from 'apollo-client/core/types';

interface IProps {
  redirect: (path: string, message: FlashMessageVariables) => void;
  revokeToken: () => Promise<ApolloQueryResult<RevokeTokenMutation>>;
  currentUser: User;
  currentUserLoading: boolean;
}

class Header extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  private logout(event: any) {
    event.preventDefault();
    this.props.revokeToken().then(response => {
      const errors = response.data.revokeToken.errors;
      if (!errors) {
        window.localStorage.removeItem('blog:token');
        (window as any).location = '/';
      }
    });
  }

  private renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) {
      return null;
    }

    if (currentUser) {
      return (
        <div className="navbar-end">
          <Link className="navbar-item" to="/users/profile/edit">
            {currentUser.name}
          </Link>
          <a className="navbar-item" href="#logout" onClick={this.logout}>
            Logout
          </a>
        </div>
      );
    }

    return (
      <div className="navbar-end">
        <Link className="navbar-item" to="/users/signup">
          Register
        </Link>
        <Link className="navbar-item" to="/users/signin">
          Login
        </Link>
      </div>
    );
  }

  public render() {
    return (
      <header className="header">
        <div className="container">
          <nav className="navbar is-primary">
            <div className="navbar-brand">
              <Link className="navbar-item" title="GraphQL rails blog" to="/">
                GraphQL rails blog
              </Link>
            </div>
            <div className="navbar-menu">{this.renderSignInLinks()}</div>
          </nav>
        </div>
      </header>
    );
  }
}

const withRevokeToken = graphql(REVOKE_TOKEN, {
  props: ({ mutate }) => ({
    revokeToken() {
      return mutate!({});
    }
  })
});

export default compose(withFlashMessage, withRevokeToken)(Header);
