import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => ({
  lesson: state.getIn(['learning', 'lesson', 'rest']),
  mode: state.getIn(['user', 'mode']),
});

export default connect(
  mapStateToProps,
)(Component);
