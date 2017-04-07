import {connect} from 'react-redux';
import {find} from 'lodash';
import Keyboard from '../components/Keyboard.jsx';

import {setKeyboard} from '../redux/modules/main';
import {updateLearningState, updateCharToType as updateCharToTypeFromLearningMode} from '../redux/modules/learning-mode';
import {updateCharToType as updateCharToTypeFromTextMode} from '../redux/modules/text-mode';

const mapStateToProps = (state) => {

   const stateMain = state.get('main');

   return {
      mode: stateMain.get('mode'),
      keys: stateMain.get('keys'),
      name: stateMain.get('keyboard')
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
