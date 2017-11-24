import { createStore } from 'redux';
import rootReducer from 'reducers/rootReducer';

export default createStore(
  rootReducer,
  {}, // initial state
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
