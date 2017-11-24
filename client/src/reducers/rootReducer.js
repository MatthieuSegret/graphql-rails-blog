import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flashReducer from 'components/flash/flashReducer';

export default combineReducers({
  form: formReducer,
  flashMessage: flashReducer
});
