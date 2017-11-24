import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withFlashMessage from 'components/withFlashMessage';
import withRevokeToken from 'mutations/auth/revokeTokenMutation';

class Header extends Component {
  static propTypes = {
    redirect: PropTypes.func,
    error: PropTypes.func,
    revokeToken: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.revokeToken().then(response => {
      if (!response.errors) {
        window.localStorage.removeItem('blog:token');
        window.location = '/';
      }
    });
  }

  renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) {
      return null;
    }

    if (currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/users/profile/edit">{currentUser.name}</Link>
          </li>
          <li>
            <a href="#logout" onClick={this.logout}>
              Logout
            </a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/users/signup">Register</Link>
        </li>
        <li>
          <Link to="/users/signin">Login</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" title="GraphQL rails blog" to="/">
              GraphQL rails blog
            </Link>
          </div>
          <div className="collapse navbar-collapse">{this.renderSignInLinks()}</div>
        </div>
      </nav>
    );
  }
}

export default withFlashMessage(withRevokeToken(Header));
