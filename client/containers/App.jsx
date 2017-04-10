import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { ConnectedRouter, push } from 'react-router-redux';

// initialize perfect-scrollbar for $ in all project;
import 'perfect-scrollbar/jquery';

import browserHistory from '../utils/history';

import Layout from '../containers/Layout.jsx';

import store from './../redux/store';

import { setMode } from '../redux/modules/main';

import {
   updateLearningState,
   setMode as setLearningMode,
   updateCharToType as updateCharToTypeFromLearningMode
} from '../redux/modules/learning-mode';


// todo: написать проверку, где брать пользователя из кук и вытягивать данные из базы
// если такого пользователя нет значит сгенерировать значения такие как уроки для мода лернинг и так далее
// можно хранить статистику за последние сутки например и при входе в аккаунт берем последнюю версию и подгоняем все на нее
// на данный момент что это за информация: это выбранная раскладка на клавиатуре и выбранный мод в лернинг моде,
// ввести ограничения на 10 текстов не больше 10000 тысяч символов

store.dispatch(updateLearningState());

store.dispatch(setMode('learning'));

store.dispatch(updateCharToTypeFromLearningMode());

export default () => (
   <Provider store={store}>
      <ConnectedRouter history={ browserHistory }>
         <Route path="/" component={ Layout } />
      </ConnectedRouter>
   </Provider>
);
