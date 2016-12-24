import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import client from 'config/apolloClient';

export default createStore(
  combineReducers({
    apollo: client.reducer(),
    form: formReducer
  }),
  applyMiddleware(client.middleware())
);
