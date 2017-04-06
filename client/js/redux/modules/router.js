import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.Map({
   locationBeforeTransitions: null
});

export default (state = initialState, action) => {

   switch (action.type) {

      case LOCATION_CHANGE:
         return state.set('locationBeforeTransitions', action.payload);

      default:
         return state;

   }

};