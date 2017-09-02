import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import modal from './modules/modal';
import textMode from './modules/text-mode';
import learningMode from './modules/learning-mode';
import user from './modules/user';
import main from './modules/main';

export default combineReducers({
  form: formReducer,
  main,
  user,
  modal,
  textMode,
  learningMode,
});
