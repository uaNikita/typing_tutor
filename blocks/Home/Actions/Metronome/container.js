import { connect } from 'react-redux';
import { setMetronomeOptions } from 'ReduxUtils/reducers/user';
import Component from './component';

const mapStateToProps = state => ({
  metronome: state.getIn(['user', 'metronome']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  setMetronomeOptions: (...args) => dispatch(setMetronomeOptions(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
