import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form'
import keypad from './keypad';

export default combineReducers({
  form: reduxFormReducer,
  keyboard: keypad
})
