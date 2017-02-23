import {connect} from 'react-redux';
import {find} from 'lodash';
import Keyboard from '../components/Keyboard.jsx';

import {setKeyboard} from '../redux/modules/main';
import {updateLearningState, updateCharToType as updateCharToTypeFromLearningMode} from '../redux/modules/learning-mode';
import {updateCharToType as updateCharToTypeFromTextMode} from '../redux/modules/text-mode';

const mapStateToProps = (state) => {
   return {
      mode: state.main.mode,
      keys: state.main.keys,
      name: state.main.keyboard
   }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
   const {dispatch} = dispatchProps;

   const {mode, keys, name} = stateProps;

   return {
      keys,
      name,
      setKeyboard: (name) => {

         dispatch(setKeyboard(name));

         switch (mode) {

            case 'learning':

               dispatch(updateLearningState());

               dispatch(updateCharToTypeFromLearningMode());

               break;

            case 'text':

               dispatch(updateCharToTypeFromTextMode());

               break;

         }

      }
   }
}


export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Keyboard)
