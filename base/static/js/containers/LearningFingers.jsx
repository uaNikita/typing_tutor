import {connect} from 'react-redux'
import {find, concat} from 'lodash';
import LearningFingers from '../components/LearningFingers.jsx'
import {
  setFingersSetSize,
  generateAndSetFingersLesson
} from '../redux/modules/learning-mode'

import {getFingersSet} from "../utils";

const mapStateToProps = (state) => {

   let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;

   return {
      fingersSetSize: state.learningMode.fingersSetSize,
      maxWordLength: state.learningMode.maxWordLength,
      fingersSet: getFingersSet(keys),
      keys
   }
   
};

const mapDispatchToProps = (dispatch) => {
   return {
      setFingersSetSize: (size) => {
         dispatch(setFingersSetSize(size));

         dispatch(generateAndSetFingersLesson(size));
      }
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFingers);