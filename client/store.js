import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import reducer from 'ReduxUtils/reducer';

// Grab the state from a global variable injected into the server-generated HTML
const initialState = Immutable.fromJS(window.PRELOADED_STATE);

// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

// Create Redux store with initial state
export default createStore(reducer, initialState, applyMiddleware(
  thunk,
));
