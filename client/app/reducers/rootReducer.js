import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import client from 'config/apolloClient';
import flashReducer from 'reducers/flashReducer';

export default combineReducers({
  apollo: client.reducer(),
  form: formReducer,
  flashMessage: flashReducer
});
