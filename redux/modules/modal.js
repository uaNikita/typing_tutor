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
      return state.merge({
        name: action.name,
        closable: action.closable === undefined ? true : action.closable,
      });

    case CLOSE_MODAL:
      return state.merge({
        name: '',
        closable: true,
      });

    default:
      return state;
  }
};

export const openModal = (name, closable) => ({
  type: OPEN_MODAL,
  name,
  closable,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
