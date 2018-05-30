import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import reducer from 'ReduxUtils/reducer';

let initialState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

initialState = Immutable.fromJS(initialState);

const setsPath = [['main', 'pressedKeys'], ['main', 'pressedWrongKeys'], ['learning', 'free', 'letters']];

initialState = setsPath.reduce((state, path) => state.setIn(path, Immutable.Set(state.getIn(path))), initialState);

export default createStore(reducer, initialState, applyMiddleware(thunk));
