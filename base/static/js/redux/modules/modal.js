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
         return {
            ...state,
            name: action.name,
            closable: !!action.closable
         }

      case CLOSE_MODAL:
         return {
            ...state,
            name: ''
         }

      default:
         return state;

   }
};