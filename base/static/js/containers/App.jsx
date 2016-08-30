import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router'
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {reducer as reduxFormReducer} from 'redux-form'
import $ from 'jquery';

import Layout from '../containers/Layout.jsx';
import Home from './Home.jsx';
import Settings from '../components/Settings.jsx';
import Mode from '../components/Mode.jsx';
import TextMode from './TextMode.jsx';
import LearningMode from './LearningMode.jsx';
import Keyboard from './Keyboard.jsx';

import reducer from '../reducers';
import {pressKey, stopBeenPressedKey, updateStartVariables, setMode} from '../actions/actions'

let store = createStore(combineReducers({
  form: reduxFormReducer,
  keyboard: reducer
}))

export default class App extends Component {

  componentDidMount() {

    $(document).on('keypress', function (e) {

      if (location.pathname !== '/') {
        return;
      }

      let char = String.fromCharCode(e.which);

      store.dispatch(pressKey(char));

      setTimeout(() => {
        store.dispatch(stopBeenPressedKey(char));
      }, 100);

    });

  }

  render() {
    return (
      <Provider store={ store }>
        <Router history={ browserHistory }>
          <Route path="/" component={ Layout }>
            <IndexRoute component={ Home } onEnter={ this._onKeyboardEnter } />
            <Route path="settings" component={ Settings }>
              <IndexRoute onEnter={this._enterDependOnMode} />
              <Route path="mode" component={ Mode }>
                <IndexRoute onEnter={this._enterDependOnMode} />
                <Route path="text" component={ TextMode } onEnter={ this._onTextEnter } />
                <Route path="learning" component={ LearningMode } onEnter={ this._onLearningEnter } />
              </Route>
              <Route path="keyboard" component={ Keyboard } />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }

  _onKeyboardEnter() {
    store.dispatch(updateStartVariables());
  }

  _enterDependOnMode(nextState, replace) {
    let path = '/settings/mode/';

    switch (store.getState().mode) {
      case 1:
        path += 'text';
        break
      case 2:
        path += 'learning';
        break
    }

    replace({
      pathname: path
    })
  }

  _onTextEnter() {
    store.dispatch(setMode(1));
  }

  _onLearningEnter() {
    store.dispatch(setMode(2));
  }
}
