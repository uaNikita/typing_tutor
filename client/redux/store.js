import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import routerReducer from './modules/router';
import modal from './modules/modal';
import textMode from './modules/text-mode';
import learningMode from './modules/learning-mode';
import main from './modules/main';

let reducer = combineReducers({
   routing: routerReducer,
   form,
   modal,
   textMode,
   learningMode,
   main,
})

const logger = createLogger();

let router = routerMiddleware(browserHistory);

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    router
    // , logger
  )
)