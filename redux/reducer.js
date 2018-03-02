import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import textMode from './modules/modes/text';
import learningMode from './modules/modes/learning';
import user from './modules/user';
import fetch from './modules/fetch';
import main from './modules/main';

export default combineReducers({
  form: formReducer,
  main,
  user,
  fetch,
  textMode,
  learningMode,
});
