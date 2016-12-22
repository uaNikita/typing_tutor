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
import LearningFingers from './LearningFingers.jsx';
import LearningFree from './LearningFree.jsx';
import Keyboard from './Keyboard.jsx';

import store from './../store';

import {
  typeChar,
  updateStartVariables,
  updateCharToType
} from '../actions/main'

import {
  setLearningMode
} from '../actions/learning-mode'


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
                    <IndexRoute onEnter={this._onSettingsEnter} />
                    <Route path="learning-mode" component={ LearningMode }>
                       <IndexRoute onEnter={this._onLearningModeEnter} />
                       <Route path="fingers" component={ LearningFingers } onEnter={this._onLearningModeFingersEnter} />
                       <Route path="free" component={ LearningFree } onEnter={this._onLearningModeFreeEnter} />
                    </Route>
                    <Route path="text-mode" component={ TextMode } />
                    <Route path="text/:textId" component={ Text } />
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

   _onSettingsEnter(nextState, replace) {






      let path = '/settings/' + store.getState().keyboard.mode + '-mode';

      replace({
         pathname: path
      });
   }

   _onLearningModeEnter(nextState, replace) {
      let path = '/settings/learning-mode/' + store.getState().learningMode.mode;

      replace({
         pathname: path
      });
   }

   _onLearningModeFingersEnter(nextState, replace) {
      store.dispatch(setLearningMode('fingers'));
   }

   _onLearningModeFreeEnter(nextState, replace) {
      store.dispatch(setLearningMode('free'));
   }
}
