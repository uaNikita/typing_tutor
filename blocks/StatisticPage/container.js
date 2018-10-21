import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state) => {
  let statistic = state.getIn(['user', 'statistic']);

  if (statistic) {
    statistic = statistic.toJS();
  }

  return {
    statistic,
  };
};

export default connect(
  mapStateToProps,
)(Component);
