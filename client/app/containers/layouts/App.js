import React, { Component, PropTypes } from 'react';

import FlashMessage from 'components/FlashMessage';
import Header from 'containers/layouts/Header';

import 'assets/stylesheets/styles.scss';
import 'assets/stylesheets/posts.scss';
import 'assets/stylesheets/comments.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div id="main">
        <Header />

        <div className="container">
          <FlashMessage />
          {this.props.children}
        </div>
      </div>
    );
  }
}
