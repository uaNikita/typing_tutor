import { connect } from 'react-redux';

import { actionMetronome } from 'Redux/modules/main';
import Metronome from '../Metronome/component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    status: stateMain.get('metronomeStatus'),
    interval: stateMain.get('metronomeInterval'),
  };
};

const mapDispatchToProps = dispatch => (
  {
    actionMetronome: (action, value) => {
      dispatch(actionMetronome(action, value));
    },
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Metronome);

