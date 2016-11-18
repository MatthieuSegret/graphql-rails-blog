import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import AllPosts from 'containers/posts/AllPosts';
import SearchPosts from 'containers/posts/SearchPosts';
import Post from 'containers/posts/Post';
import NewPost from 'containers/posts/NewPost';
import NotFound from 'components/NotFound';

import { deleteFlashMessage } from 'actions/flashActions';
import store from 'config/store';

export default (
  <Route path="/" component={App} onChange={() => { store.dispatch(deleteFlashMessage()); }} >
    <IndexRoute component={AllPosts} />
    <Route path="/posts/search/:keywords" component={SearchPosts} />
    <Route path="/posts/new" component={NewPost} />
    <Route path="/posts/:id" component={Post} />
    <Route path="*" component={NotFound} />
  </Route>
);
