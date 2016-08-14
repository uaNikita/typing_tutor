import { connect } from 'react-redux'
import Metronome from '../components/Metronome.jsx'
import { actionMetronome } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    status: state.metronomeStatus,
    interval: state.metronomeInterval,
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
