import { connect } from 'react-redux';
import {
  processSetOptions,
  generateFingersLesson,
  setFingersExample,
} from 'ReduxUtils/reducers/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component';

const mapStateToProps = (state) => {
  const keys = state.getIn(['main', 'keys']).toJS();

  const stateFingers = state.getIn(['learning', 'fingers']);

  return {
    example: stateFingers.get('example'),
    options: stateFingers.get('options').toJS(),
    fingersSet: getFingersSet(keys),
    keys,
  };
};

const mapDispatchToProps = dispatch => ({
  updateOptions: (options) => {
    dispatch(processSetOptions({
      mode: 'fingers',
      options,
    }));

    const example = dispatch(generateFingersLesson());

    dispatch(setFingersExample(example));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
