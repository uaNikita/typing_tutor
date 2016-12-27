import * as types from '../constants/action-types/modal';

import {assign} from 'lodash';

const INITIAL_STATE = {
  name: '',

  closable: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case types.OPEN_MODAL:
      return (() => {
        let closable = true;

        if (action.closable) {
          closable = action.closable;
        }

        return assign({}, state, {
          name: action.name,
          closable
        });
      })()

    case types.CLOSE_MODAL:
      return assign({}, state, {
        name: ''
      });

    default:
      return state;

  }
};