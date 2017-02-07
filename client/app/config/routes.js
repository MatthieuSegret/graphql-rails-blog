import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import AllPosts from 'containers/posts/AllPosts';
import SearchPosts from 'containers/posts/SearchPosts';
import Post from 'containers/posts/Post';
import NewPost from 'containers/posts/NewPost';
import EditPost from 'containers/posts/EditPost';
import SignInUser from 'containers/users/SignInUser';
import SignUpUser from 'containers/users/SignUpUser';
import EditUser from 'containers/users/EditUser';

import UserIsAuthenticated from 'components/UserIsAuthenticated';
import NotFound from 'components/NotFound';

import { deleteFlashMessage } from 'actions/flashActions';
import store from 'config/store';

export default (
  <Route path="/" component={App} onChange={() => { store.dispatch(deleteFlashMessage()); }} >
    <IndexRoute component={AllPosts} />
    <Route path="/posts/search/:keywords" component={SearchPosts} />
    <Route path="/posts/new" component={UserIsAuthenticated(NewPost)} />
    <Route path="/posts/:id/edit" component={UserIsAuthenticated(EditPost)} />
    <Route path="/posts/:id" component={Post} />
    <Route path="/users/signin" component={SignInUser} />
    <Route path="/users/signup" component={SignUpUser} />
    <Route path="users/profile/edit" component={EditUser} />
    <Route path="*" component={NotFound} />
  </Route>
);
