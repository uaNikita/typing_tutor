import { connect } from 'react-redux';

import { updateFreeOptionsAndExample } from 'ReduxUtils/modules/modes/learning';

import LearningFree from './component.jsx';

const mapStateToProps = state => {
  const stateFree = state.getIn(['learning', 'free']);

  return {
    example: stateFree.getIn('example'),
    options: stateFree.getIn('options').toJS(),
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
