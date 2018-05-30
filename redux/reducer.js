import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import text from './modules/modes/text';
import learning from './modules/modes/learning';
import user from './modules/user';
import fetch from './modules/fetch';
import main from './modules/main';

export default combineReducers({
  form: formReducer,
  main,
  user,
  fetch,

  // modes
  text,
  learning,
});
