import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form';
import { routerMiddleware, routerReducer } from 'react-router-redux';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import modal from './modules/modal';
import textMode from './modules/text-mode';
import learningMode from './modules/learning-mode';
import main from './modules/main';

import browserHistory from '../utils/history'

let reducer = combineReducers({
   router: routerReducer,
   form,
   modal,
   textMode,
   learningMode,
   main,
})

// const logger = createLogger();

let router = routerMiddleware(browserHistory);

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    router
    // , logger
  )
)
