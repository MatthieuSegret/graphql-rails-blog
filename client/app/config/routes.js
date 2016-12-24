import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/layouts/App';
import Hello from 'components/Hello';
import NotFound from 'components/NotFound';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={Hello} />
    <Route path="*" component={NotFound} />
  </Route>
);
