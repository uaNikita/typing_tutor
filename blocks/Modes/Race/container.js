import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import { setRace } from 'ReduxUtils/reducers/modes/race';

import Component from './component';

const mapStateToProps = state => ({
  lesson: state.getIn(['syllable', 'lesson', 'rest']),
  mode: state.getIn(['user', 'mode']),
  email: state.getIn(['user', 'email']),
  activeRace: state.getIn(['race', 'active']),
});

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setRace: (...args) => dispatch(setRace(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
