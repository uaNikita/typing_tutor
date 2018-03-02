import { connect } from 'react-redux';
import { updateCharToType } from 'ReduxUtils/modules/modes/learning';

import Textarea from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    lessonTyped: stateLearningMode.get('lessonTyped'),
    lessonRest: stateLearningMode.get('lessonRest'),
  };
};

const mapDispatchToProps = dispatch => ({
  updateCharToType: (...args) => dispatch(updateCharToType(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);

