import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import client from 'config/apolloClient';
import store from 'config/store';
import App from 'containers/layouts/App';

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('application')
);
