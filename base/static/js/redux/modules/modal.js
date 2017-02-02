const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

import {assign} from 'lodash';

const INITIAL_STATE = {
   name: '',

   closable: true,
};

export default (state = INITIAL_STATE, action = {}) => {
   switch (action.type) {

      case OPEN_MODAL:
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

      case CLOSE_MODAL:
         return assign({}, state, {
            name: ''
         });

      default:
         return state;

   }
};