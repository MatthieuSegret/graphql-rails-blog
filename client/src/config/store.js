import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import flashReducer from 'components/flash/flashReducer';

const rootReducer = combineReducers({
  form: formReducer,
  flashMessage: flashReducer
});

export default createStore(
  rootReducer,
  {}, // initial state
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
