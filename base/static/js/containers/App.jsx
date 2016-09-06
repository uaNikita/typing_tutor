import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import $ from 'jquery';

import Layout from '../containers/Layout.jsx';
import Home from './Home.jsx';
import Settings from '../components/Settings.jsx';
import TextMode from './TextMode.jsx';
import Text from './Text.jsx';
import LearningMode from './LearningMode.jsx';
import Keyboard from './Keyboard.jsx';

import store from './../store';
import {
  typeChar,
  updateStartVariables,
  setMode,
  updateCharToType
} from '../actions/main'

const history = syncHistoryWithStore(browserHistory, store)

export default class App extends Component {

  componentDidMount() {

    store.dispatch(updateCharToType());

    $(document).on('keypress', (e) => {
      if (location.pathname !== '/') {
        return;
      }

      store.dispatch(typeChar(String.fromCharCode(e.which)));
    });

  }

  render() {
    return (
      <Provider store={store}>
        <Router history={ history }>
          <Route path="/" component={ Layout }>
            <IndexRoute component={ Home } onEnter={ this._onKeyboardEnter } />
            <Route path="settings" component={ Settings }>
              <IndexRoute onEnter={this._enterDependOnMode} />
              <Route path="text-mode" component={ TextMode } onEnter={ this._onTextEnter } />
              <Route path="text/:textId" component={ Text } />
              <Route path="learning-mode" component={ LearningMode } onEnter={ this._onLearningEnter } />
              <Route path="keyboard" component={ Keyboard } />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }

  _onKeyboardEnter() {
    store.dispatch(updateStartVariables());

    store.dispatch(updateCharToType());
  }

  _enterDependOnMode(nextState, replace) {
    let path = '/settings/' + store.getState().keyboard.mode;

    replace({
      pathname: path + '-mode'
    })
  }

  _onTextEnter() {
    store.dispatch(setMode('text'));
  }

  _onLearningEnter() {
    store.dispatch(setMode('learning'));
  }
}
