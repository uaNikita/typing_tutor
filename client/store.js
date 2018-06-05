import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import _ from 'lodash';

import temp from 'Utils/temp';
import reducer from 'ReduxUtils/reducer';

// get state from server
let initialState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

// get state from localStorage
const localState = temp.get();

if (!_.isEmpty(localState)) {
  initialState = _.merge(initialState, localState);
}

initialState = Immutable.fromJS(initialState);

// transform some array to Set
const setsPath = [['main', 'pressedKeys'], ['main', 'pressedWrongKeys'], ['learning', 'free', 'letters']];

initialState = setsPath.reduce((state, path) => state.setIn(path, Immutable.Set(state.getIn(path))), initialState);

export default createStore(reducer, initialState, applyMiddleware(thunk));
