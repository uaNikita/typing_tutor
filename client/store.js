import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import _ from 'lodash';
import reducer from 'ReduxUtils/reducer';

let initialState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

// merge localStorage to state if needed
const touchToTypeStorage = window.localStorage.getItem('touchToType');

if (touchToTypeStorage) {
  initialState = _.merge(initialState, JSON.parse(touchToTypeStorage));
}

initialState = Immutable.fromJS(initialState);

const setsPath = [['main', 'pressedKeys'], ['main', 'pressedWrongKeys'], ['learningMode', 'lettersFree']];

initialState = setsPath.reduce((state, path) => state.setIn(path, Immutable.Set(state.getIn(path))), initialState);

export default createStore(reducer, initialState, applyMiddleware(thunk));
