import { connect } from 'react-redux';
import {
  processSetOptionsAndUpdate,
} from 'ReduxUtils/reducers/modes/learning';

import { getFingersSet } from 'Utils';

import Component from './component';

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
  updateOptions: options => dispatch(processSetOptionsAndUpdate({
    mode: 'fingers',
    options,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
