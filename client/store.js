import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import _ from 'lodash';
import reducer from 'ReduxUtils/reducer';

let initialState = window.PRELOADED_STATE;

delete window.PRELOADED_STATE;

if (!initialState.user.email) {
  const touchToTypeStorage = window.localStorage.getItem('touchToType');

  if (touchToTypeStorage) {
    initialState = _.merge(initialState, JSON.parse(touchToTypeStorage));
  }
}

export default createStore(reducer, Immutable.fromJS(initialState), applyMiddleware(thunk));
