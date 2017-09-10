import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from 'ReduxUtils/reducer';

let initialState = {};

if (BROWSER) {
  // Grab the state from a global variable injected into the server-generated HTML
  initialState = window.PRELOADED_STATE;

  // Allow the passed state to be garbage-collected
  delete window.PRELOADED_STATE;
}

initialState = Immutable.fromJS(initialState);

// Create Redux store with initial state
const store = createStore(reducer, initialState, applyMiddleware(
  thunk,
));

export default store;
