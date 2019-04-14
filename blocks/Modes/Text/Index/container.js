import { connect } from 'react-redux';
import _ from 'lodash';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
} from 'ReduxUtils/reducers/main';
import { updateCharToType } from 'ReduxUtils/reducers/modes/text';

import Component from './component';

const mapStateToProps = (state) => {
  const stateText = state.get('text');
  const entities = stateText.get('entities');
  const selectedId = stateText.get('selectedId');

  let text;

  if (entities && _.isNumber(selectedId)) {
    text = entities
      .filter(obj => obj.get('id') === selectedId)
      .get(0)
      .toJS();
  }

  return {
    text,
    hiddenChars: state.getIn(['user', 'hiddenChars']),
  };
};

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
