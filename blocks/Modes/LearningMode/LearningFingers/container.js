import { connect } from 'react-redux';
import { processSetFingersOptions, generateFingersLesson } from 'ReduxUtils/modules/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateFingers = state.getIn(['learning', 'fingers']);

  return {
    maxLettersInWord: stateFingers.get('maxLettersInWord'),
    setSize: stateFingers.get('setSize'),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setOptions: (...args) => dispatch(processSetFingersOptions(...args)),
  generateFingersLesson: (...args) => dispatch(generateFingersLesson(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
