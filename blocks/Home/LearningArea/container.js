import { connect } from 'react-redux';
import {
  setStartTypingTime,
  zeroingStatic,
  typeChar,
} from 'ReduxUtils/reducers/main';
import {
  updateCharToType,
} from 'ReduxUtils/reducers/modes/learning';

import Textarea from './component';

const mapStateToProps = state => ({
  hiddenChars: state.getIn(['user', 'hiddenChars']),
  lesson: state.getIn(['learning', 'lesson']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  setStartTypingTime: (...args) => dispatch(setStartTypingTime(...args)),
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
  typeChar: (...args) => dispatch(typeChar(...args)),
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
