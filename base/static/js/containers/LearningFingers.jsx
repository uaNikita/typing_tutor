import {connect} from 'react-redux'
import {find, concat} from 'lodash';
import LearningFingers from '../components/LearningFingers.jsx'
import {
  setFingersSetSize,
  generateAndSetFingersLesson
} from '../actions/learning-mode'

const mapStateToProps = (state) => {
   return {
      fingersSetSize: state.learningMode.fingersSetSize,
      maxWordLength: state.learningMode.maxWordLength,
      keys: find(state.main.keyboards, {'name': state.main.keyboard}).keys
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