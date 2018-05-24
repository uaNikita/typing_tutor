import { connect } from 'react-redux';
import { updateCharToType } from 'ReduxUtils/modules/modes/learning';

import Textarea from './component.jsx';

const mapStateToProps = state => {
  const stateLesson = state.getIn(['learningMode', 'lesson']);

  return {
    lessonTyped: stateLesson.getIn(['lesson', 'typed']),
    lessonRest: stateLesson.getIn(['lesson', 'rest']),
  };
};

const mapDispatchToProps = dispatch => ({
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);

