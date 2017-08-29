import { connect } from 'react-redux';

import { setKeyboard } from 'ReduxUtils/modules/main';
import {
  updateLearningState,
  updateCharToType as updateCharToTypeFromLearningMode,
} from 'ReduxUtils/modules/learning-mode';
import { updateCharToType as updateCharToTypeFromTextMode } from 'ReduxUtils/modules/text-mode';
import Keyboard from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    mode: stateMain.get('mode'),
    keys: stateMain.get('keys'),
    name: stateMain.get('keyboard'),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps;

  const { mode, keys, name } = stateProps;

  return {
    keys,
    name,
    setKeyboard: boardName => {
      dispatch(setKeyboard(boardName));

      switch (mode) {
        case 'learning':
          dispatch(updateLearningState());

          dispatch(updateCharToTypeFromLearningMode());

          break;
        case 'text':
          dispatch(updateCharToTypeFromTextMode());

          break;
      }
    },
  };
};


export default connect(
  mapStateToProps,
  null,
  mergeProps,
)(Keyboard);

