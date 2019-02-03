import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';

import Component from './component';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
});

const mapStateToProps = state => ({
  lesson: state.getIn(['syllable', 'lesson', 'rest']),
  mode: state.getIn(['user', 'mode']),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
