import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import AllPosts from 'containers/posts/AllPosts';
import SearchPosts from 'containers/posts/SearchPosts';
import Post from 'containers/posts/Post';
import NewPost from 'containers/posts/NewPost';
import EditPost from 'containers/posts/EditPost';

import SignInUser from 'containers/users/SignInUser';
import SignUpUser from 'containers/users/SignUpUser';
import EditUserProfile from 'containers/users/EditUserProfile';
import ChangeUserPassword from 'containers/users/ChangeUserPassword';

import UserIsAuthenticated from 'components/UserIsAuthenticated';
import NotFound from 'components/NotFound';
import Header from 'containers/layouts/Header';

import { deleteFlashMessage } from 'actions/flashActions';
import FlashMessage from 'components/FlashMessage';
import withCurrentUser from 'queries/users/currentUserQuery';

import 'assets/stylesheets/css/styles.css';

class App extends Component {
  static propTypes = {
    history: PropTypes.object,
    deleteFlashMessage: PropTypes.func,
    currentUser: PropTypes.object,
    currentUserLoading: PropTypes.bool
  };

  componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = location => {
    this.props.deleteFlashMessage();
  };

  render() {
    const { currentUser, currentUserLoading } = this.props;

    return (
      <div id="main">
        <Header currentUser={currentUser} currentUserLoading={currentUserLoading} />

        <div className="container">
          <FlashMessage />
          <Switch>
            <Route path="/" exact component={AllPosts} />
            <Route path="/posts/search/:keywords" component={SearchPosts} />
            <Route path="/posts/new" component={UserIsAuthenticated(NewPost)} />
            <Route path="/posts/:id/edit" component={UserIsAuthenticated(EditPost)} />
            <Route path="/posts/:id" component={Post} />
            <Route path="/users/signin" component={SignInUser} />
            <Route path="/users/signup" component={SignUpUser} />
            <Route path="/users/profile/edit" component={UserIsAuthenticated(EditUserProfile)} />
            <Route path="/users/password/edit" component={UserIsAuthenticated(ChangeUserPassword)} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default compose(withCurrentUser, withRouter, connect(null, { deleteFlashMessage }))(App);
