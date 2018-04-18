import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    lesson: stateLearningMode.get('lessonRest'),
    learningMode: stateLearningMode.get('mode'),
    mode: state.getIn(['user', 'mode']),
  };
};

export default connect(
  mapStateToProps,
)(Component);
