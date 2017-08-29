import { connect } from 'react-redux';

import { setKeyboard } from 'ReduxUtils/modules/main';
import {
  updateLearningState,
  updateCharToType as updateCharToTypeFromLearningMode,
} from 'ReduxUtils/modules/learning-mode';
import { updateCharToType as updateCharToTypeFromTextMode } from 'ReduxUtils/modules/text-mode';
import MenuItem from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    mode: stateMain.get('mode'),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps;

  const { mode } = stateProps;

  return {
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
)(MenuItem);

