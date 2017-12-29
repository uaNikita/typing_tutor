import { connect } from 'react-redux';

import { zeroingStatic } from 'ReduxUtils/modules/learning-mode';

import Textarea from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    successTypes: stateLearningMode.get('successTypes'),
    errorTypes: stateLearningMode.get('errorTypes'),
    lessonTyped: stateLearningMode.get('lessonTyped'),
    lessonRest: stateLearningMode.get('lessonRest'),
  };
};

const mapDispatchToProps = dispatch => ({
  zeroingStatic: (...args) => dispatch(zeroingStatic(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);

