import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form'
import { routerReducer } from 'react-router-redux'
import modal from './modal';
import textMode from './text-mode';
import learningMode from './learning-mode';
import keypad from './keypad';

export default combineReducers({
  routing: routerReducer,
  form: reduxFormReducer,
  keyboard: keypad,
  modal,
  textMode,
  learningMode
})
