import { createStore, applyMiddleware, compose } from 'redux';
import client from 'config/apolloClient';
import rootReducer from 'reducers/rootReducer';

export default createStore(
  rootReducer,
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
