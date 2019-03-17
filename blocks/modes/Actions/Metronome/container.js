import { connect } from 'react-redux';
import { processSetSettings } from 'ReduxUtils/reducers/user';
import Component from './component';

const mapStateToProps = state => ({
  metronome: state.getIn(['user', 'metronome']).toJS(),
});

const mapDispatchToProps = dispatch => ({
  setMetronomeOptions: obj => dispatch(processSetSettings({ metronome: obj })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
