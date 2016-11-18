import { createStore, applyMiddleware } from 'redux';
import client from 'config/apolloClient';
import rootReducer from 'reducers/rootReducer';

export default createStore(
  rootReducer,
  applyMiddleware(client.middleware())
);
