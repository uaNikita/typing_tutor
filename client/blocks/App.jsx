import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import browserHistory from 'Utils/history';

import store from 'Redux/store';

import { setMode } from 'Redux/modules/main';

import {
  updateLearningState,
  updateCharToType as updateCharToTypeFromLearningMode,
} from 'Redux/modules/learning-mode';

import Layout from './Layout/container.jsx';

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
    <ConnectedRouter history={browserHistory}>
      <Route path="/" component={Layout} />
    </ConnectedRouter>
  </Provider>
);
