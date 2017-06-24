import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { withApollo } from 'react-apollo';

import withFlashMessage from 'components/withFlashMessage';
import axios from 'config/axios';

class Header extends Component {

  static propTypes = {
    redirect: PropTypes.func,
    error: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool,
    client: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    axios.delete('/users/sign_out').then((response) => {
      if (response.status !== 204) {
        this.props.error("Oops, we're sorry, but something went wrong");
      } else {
        this.props.client.resetStore();
        this.props.redirect('/', { notice: 'Logout in successfully.' });
      }
    });
  }

  renderSignInLinks() {
    const { currentUser, currentUserLoading } = this.props;
    if (currentUserLoading) { return null; }

    if (currentUser) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="users/profile/edit">{currentUser.name}</Link></li>
          <li><a href="#logout" onClick={this.logout}>Logout</a></li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/users/signup">Register</Link></li>
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

export default withFlashMessage(withApollo(Header));
