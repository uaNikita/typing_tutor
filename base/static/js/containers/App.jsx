import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import $ from 'jquery';

// initialize perfect-scrollbar for $ in all project;
import 'perfect-scrollbar/jquery';

import Layout from '../containers/Layout.jsx';
import Home from './Home.jsx';
import Settings from '../components/Settings.jsx';
import TextMode from './TextMode.jsx';
import Text from './Text.jsx';
import AddText from './AddText.jsx';
import LearningMode from './LearningMode.jsx';
import LearningFingers from './LearningFingers.jsx';
import LearningFree from './LearningFree.jsx';
import Keyboard from './Keyboard.jsx';

import store from './../redux/store';

import {
   setMode,
   typeChar,
   updateStartVariables
} from '../redux/modules/main';

import {
   updateLearningState,
   refreshCurrentLesson,
   setMode as setLearningMode,
   updateCurrentLessonFromCurrentMode as updateCurrentLearningLessonFromCurrentLearningMode,
   updateCharToType as updateCharToTypeFromLearningMode,
} from '../redux/modules/learning-mode';

const history = syncHistoryWithStore(browserHistory, store);

// todo: написать проверку, где брать пользователя из кук и вытягивать данные из базы
// если такого пользователя нет значит сгенерировать значения такие как уроки для мода лернинг и так далее
// можно хранить статистику за последние сутки например и при входе в аккаунт берем последнюю версию и подгоняем все на нее
// на данный момент что это за информация: это выбранная раскладка на клавиатуре и выбранный мод в лернинг моде,
// ввести ограничения на 10 текстов не больше 10000 тысяч символов

store.dispatch(updateLearningState());

store.dispatch(setMode('learning'));

store.dispatch(updateCharToTypeFromLearningMode());

const $document = $(document);

const keyPressHandler = e => {

   if (e.which !== 32) {
      store.dispatch(typeChar(String.fromCharCode(e.which)));
   }

};

const keyDownHandler = e => {

   if (e.which == 32) {
      e.preventDefault();

      store.dispatch(typeChar(String.fromCharCode(e.which)));
   }

}

export default class App extends Component {

   render() {
      return (
        <Provider store={store}>
           <Router history={ history }>
              <Route path="/" component={ Layout }>
                 <IndexRoute
                   component={ Home }
                   onEnter={ this._onKeyboardEnter } />
                 <Route path="settings" component={ Settings }>
                    <IndexRoute onEnter={this._onSettingsEnter} />

                    <Route path="learning-mode" component={ LearningMode }>
                       <IndexRoute onEnter={this._onLearningModeEnter} />
                       <Route path="fingers" component={ LearningFingers } onEnter={this._onLearningModeFingersEnter} />
                       <Route path="free" component={ LearningFree } onEnter={this._onLearningModeFreeEnter} />
                    </Route>

                    <Route path="text-mode">
                       <IndexRoute component={ TextMode } onEnter={this._onTextModeEnter} />
                       <Route path="text/:textId" component={ Text } />
                       <Route path="add-text" component={ AddText } />
                    </Route>

                    <Route path="keyboard" component={ Keyboard } />
                 </Route>
              </Route>
           </Router>
        </Provider>
      );
   }

   _onKeyboardEnter() {

      $document.on('keydown', keyDownHandler);

      $document.on('keypress', keyPressHandler);

      store.dispatch(updateStartVariables());

   }

   _onSettingsEnter(nextState, replace) {

      $document.off('keydown', keyDownHandler);

      $document.off('keypress', keyPressHandler);

      store.dispatch(refreshCurrentLesson());

      let path = '/settings/' + store.getState().main.mode + '-mode';

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

   _onLearningModeFingersEnter() {

      const state = store.getState();

      if (state.learningMode.mode !== 'fingers') {

         store.dispatch(setLearningMode('fingers'));

         store.dispatch(updateCurrentLearningLessonFromCurrentLearningMode());

         if (state.main.mode === 'learning') {
            store.dispatch(updateCharToTypeFromLearningMode());
         }

      }

   }

   _onLearningModeFreeEnter(nextState, replace) {

      const state = store.getState();

      if (state.learningMode.mode !== 'free') {

         store.dispatch(setLearningMode('free'));

         store.dispatch(updateCurrentLearningLessonFromCurrentLearningMode());

         if (state.main.mode === 'learning') {
            store.dispatch(updateCharToTypeFromLearningMode());
         }

      }

   }

   _onTextModeEnter() {


   }

}
