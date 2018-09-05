import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  statistic: state.getIn(['user', 'statistic']).toJS(),
});

export default connect(
  mapStateToProps,
)(Component);
