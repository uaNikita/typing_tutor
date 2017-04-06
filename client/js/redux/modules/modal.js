import Immutable from 'immutable';

const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState = Immutable.Map({
   name: '',

   closable: true,
});


export default (state = initialState, action = {}) => {
   switch (action.type) {

      case OPEN_MODAL:
         return state.merge({
            name: action.name,
            closable: !!action.closable
         });

      case CLOSE_MODAL:
         return state.set('name', '');

      default:
         return state;

   }
};