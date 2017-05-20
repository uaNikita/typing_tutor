import {connect} from 'react-redux'
import Metronome from '../Metronome/component.jsx'
import {actionMetronome} from 'Redux/modules/main'

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
