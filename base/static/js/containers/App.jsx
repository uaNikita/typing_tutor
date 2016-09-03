import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router'
import {Provider} from 'react-redux';
import $ from 'jquery';

import Layout from '../containers/Layout.jsx';
import Home from './Home.jsx';
import Settings from '../components/Settings.jsx';
import Mode from '../components/Mode.jsx';
import TextMode from './TextMode.jsx';
import LearningMode from './LearningMode.jsx';
import Keyboard from './Keyboard.jsx';

import store from './../store';
import {typeChar, updateStartVariables, setMode} from '../actions/actions'

export default class App extends Component {

  componentDidMount() {

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
    let path = '/settings/mode/' + store.getState().keyboard.mode;
    
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
