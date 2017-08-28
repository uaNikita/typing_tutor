import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
// import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import modal from './modules/modal';
import textMode from './modules/text-mode';
import learningMode from './modules/learning-mode';
import main from './modules/main';

const reducer = combineReducers({
  form: formReducer,
  main,
  modal,
  textMode,
  learningMode,
});

// const logger = createLogger();

export default createStore(
  reducer,
  applyMiddleware(
    thunk,
    // , logger
  ),
);
