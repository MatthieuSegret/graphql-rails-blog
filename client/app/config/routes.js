import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import AllPosts from 'containers/posts/AllPosts';
import Post from 'containers/posts/Post';
import NotFound from 'components/NotFound';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={AllPosts} />
    <Route path="/posts/:id" component={Post} />
    <Route path="*" component={NotFound} />
  </Route>
);
