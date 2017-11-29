import { createStore } from 'redux';
import { combineReducers } from 'redux';
import flashReducer from 'components/flash/flashReducer';

const rootReducer = combineReducers({
  flashMessage: flashReducer
});

export default createStore(
  rootReducer,
  {}, // initial state
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
