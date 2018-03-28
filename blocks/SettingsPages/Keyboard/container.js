import { connect } from 'react-redux';

import { setKeyboard } from 'ReduxUtils/modules/main';
import {
  initLessons,
  updateCharToType as updateCharToTypeFromLearningMode,
} from 'ReduxUtils/modules/modes/learning';
import { updateCharToType as updateCharToTypeFromTextMode } from 'ReduxUtils/modules/modes/text';
import Keyboard from './component.jsx';

const mapStateToProps = state => {
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
    setKeyboard: boardName => {
      dispatch(setKeyboard(boardName));

      switch (mode) {
        case 'learning':
          dispatch(initLessons());

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

