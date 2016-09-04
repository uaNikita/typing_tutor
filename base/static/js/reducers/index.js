import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form'
import modal from './modal';
import textMode from './text-mode';
import learningMode from './learning-mode';
import keypad from './keypad';

export default combineReducers({
  form: reduxFormReducer,
  keyboard: keypad,
  modal,
  textMode,
  learningMode
})
