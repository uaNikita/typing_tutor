import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import convert from 'Utils/listToSetsConverter';
import reducer from 'ReduxUtils/reducer';

// get state from server
let initialState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

initialState = Immutable.fromJS(initialState);

initialState = convert(initialState);

export default createStore(reducer, initialState, applyMiddleware(thunk));
