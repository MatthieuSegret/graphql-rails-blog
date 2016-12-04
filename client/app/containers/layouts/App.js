import React, { Component, PropTypes } from 'react';

import 'assets/stylesheets/styles.scss';
import 'assets/stylesheets/posts.scss';
import Header from './Header';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div id="main">
        <Header />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
