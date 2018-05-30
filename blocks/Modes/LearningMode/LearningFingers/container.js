import { connect } from 'react-redux';
import { processSetFingersOptions, generateFingersLesson } from 'ReduxUtils/modules/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateFingers = state.getIn(['learning', 'fingers']);

  return {
    sizeFingers: stateFingers.get('setSize'),
    maxLettersInWord: stateFingers.get('maxLettersInWord'),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  setSizeFingers: size =>
    dispatch(processSetFingersOptions({
      setSize: size,
    })),
  setMaxLettersInWord: length =>
    dispatch(processSetFingersOptions({
      maxLettersInWord: length,
    })),
  generateFingersLesson: (...args) => dispatch(generateFingersLesson(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
