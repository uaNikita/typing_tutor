import { connect } from 'react-redux';

import { setKeyboard } from 'ReduxUtils/reducers/main';
import {
  initLessons,
  updateCharToType as updateCharToTypeFromLearningMode,
} from 'ReduxUtils/reducers/modes/learning';
import { updateCharToType as updateCharToTypeFromTextMode } from 'ReduxUtils/reducers/modes/text';
import Keyboard from './component';

const mapStateToProps = (state) => {
  const stateMain = state.get('main');

  return {
    mode: state.getIn(['user', 'mode']),
    keys: stateMain.get('keys').toJS(),
    name: stateMain.get('keyboard'),
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { dispatch } = dispatchProps;

  const { mode, keys, name } = stateProps;

  return {
    keys,
    name,
    setKeyboard: (boardName) => {
      dispatch(setKeyboard(boardName));

      switch (mode) {
        case 'learning':
          dispatch(initLessons());

          dispatch(updateCharToTypeFromLearningMode());

          break;
        case 'text':
          dispatch(updateCharToTypeFromTextMode());

          break;

        default:
      }
    },
  };
};


export default connect(
  mapStateToProps,
  null,
  mergeProps,
)(Keyboard);
