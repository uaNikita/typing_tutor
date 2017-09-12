import Immutable from 'immutable';

const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

const initialState = Immutable.Map({
  name: '',

  closable: true,
});


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_MODAL:
      return state.set({
        name: action.name,
        closable: action.closable === undefined ? true : action.closable,
      });

    case CLOSE_MODAL:
      return state.set({
        name: '',
        closable: true,
      });

    default:
      return state;
  }
};

export function openModal(name, closable) {
  return {
    type: OPEN_MODAL,
    name,
    closable,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
