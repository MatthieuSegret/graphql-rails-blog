import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" title="GraphQL rails blog" to="/">
              GraphQL rails blog
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
