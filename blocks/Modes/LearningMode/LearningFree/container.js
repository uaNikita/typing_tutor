import { connect } from 'react-redux';

import { updateFreeOptionsAndExample } from 'ReduxUtils/reducers/modes/learning';

import LearningFree from './component';

const mapStateToProps = (state) => {
  const stateFree = state.getIn(['learning', 'free']);

  return {
    example: stateFree.get('example'),
    options: stateFree.get('options').toJS(),
    keys: state.getIn(['main', 'keys']).toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  updateOptions: (...args) => dispatch(updateFreeOptionsAndExample(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
