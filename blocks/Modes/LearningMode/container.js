import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => ({
  lesson: state.getIn(['learningMode', 'lessonRest']),
  mode: state.getIn(['user', 'mode']),
});

export default connect(
  mapStateToProps,
)(Component);
