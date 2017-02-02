import { connect } from 'react-redux'
import Metronome from '../components/Metronome.jsx'
import { actionMetronome } from '../redux/modules/main'

const mapStateToProps = (state) => {
  return {
    status: state.main.metronomeStatus,
    interval: state.main.metronomeInterval,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionMetronome: (action, value) => {
      dispatch(actionMetronome(action, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metronome)
