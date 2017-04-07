import {connect} from 'react-redux'
import Metronome from '../components/Metronome.jsx'
import {actionMetronome} from '../redux/modules/main'

const mapStateToProps = (state) => {

   const stateMain = state.get('main');

   return {
      status: stateMain.get('metronomeStatus'),
      interval: stateMain.get('metronomeInterval'),
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
