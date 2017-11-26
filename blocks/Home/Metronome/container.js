import { connect } from 'react-redux';

import { actionMetronome } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    status: stateMain.get('metronomeStatus'),
    interval: stateMain.get('metronomeInterval'),
  };
};

const mapDispatchToProps = dispatch => ({
  actionMetronome: (action, value) => {
    dispatch(actionMetronome(action, value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

