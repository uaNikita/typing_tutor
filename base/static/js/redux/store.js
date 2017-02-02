import {combineReducers, createStore, applyMiddleware} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';

import textMode from './modules/text-mode';
import learningMode from './modules/learning-mode';
import main from './modules/main';

let reducer = combineReducers({
   routing: routerReducer,
   form: reduxFormReducer,
   main,
   textMode,
   learningMode
})

const logger = createLogger();

export default createStore(
  reducer,
  applyMiddleware(thunk
    // , logger
  )
)
