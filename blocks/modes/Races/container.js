import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import { setRace, setSocket } from 'ReduxUtils/reducers/modes/race';

import Component from './component';

const mapStateToProps = state => ({
  activeRace: state.getIn(['race', 'active']),
});

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setRace: (...args) => dispatch(setRace(...args)),
  setSocket: (...args) => dispatch(setSocket(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
