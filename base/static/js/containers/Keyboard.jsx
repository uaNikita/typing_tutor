import {connect} from 'react-redux';
import {find} from 'lodash';
import Keyboard from '../components/Keyboard.jsx';

import {setKeyboard} from '../redux/modules/main';
import {initializeLearningState} from '../redux/modules/learning-mode';

const mapStateToProps = (state) => {
   return {
      keys: state.main.keys,
      name: state.main.keyboard
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setKeyboard: (name) => {

         dispatch(setKeyboard(name));

         dispatch(initializeLearningState(name));

      }
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard)
