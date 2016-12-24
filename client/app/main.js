import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import client from 'config/apolloClient';
import store from 'config/store';
import routes from 'config/routes';

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>,
  document.getElementById('application')
);
