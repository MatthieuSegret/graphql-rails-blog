import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import AllPosts from 'containers/posts/AllPosts';
import NotFound from 'components/NotFound';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={AllPosts} />
    <Route path="*" component={NotFound} />
  </Route>
);
