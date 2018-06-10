import { connect } from 'react-redux';
import { updateFingersOptionsAndExample } from 'ReduxUtils/modules/modes/learning';

import { getFingersSet } from 'Utils';

import LearningFingers from './component.jsx';

const mapStateToProps = state => {
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
  updateOptions: (...args) => dispatch(updateFingersOptionsAndExample(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFingers);
