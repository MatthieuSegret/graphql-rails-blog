import { createStore, combineReducers, applyMiddleware } from 'redux';
import client from 'config/apolloClient';

export default createStore(
  combineReducers({
    apollo: client.reducer()
  }),
  applyMiddleware(client.middleware())
);
