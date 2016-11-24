import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {

  static propTypes = {
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  }

  renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) { return null; }

    if (currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="#">{currentUser.name}</Link></li>
          <li><a href="#logout" onClick={this.logout}>Logout</a></li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="#">Register</Link></li>
        <li><Link to="/users/signin">Login</Link></li>
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
          <div className="collapse navbar-collapse">
            {this.renderSignInLinks()}
          </div>
        </div>
      </nav>
    );
  }
}
