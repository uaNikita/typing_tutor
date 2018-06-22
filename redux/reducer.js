import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';

import text from './reducers/modes/text';
import learning from './reducers/modes/learning';
import user from './reducers/user';
import fetch from './reducers/fetch';
import main from './reducers/main';

export default combineReducers({
  form: formReducer,
  main,
  user,
  fetch,

  // modes
  text,
  learning,
});
