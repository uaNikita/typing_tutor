import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningFingers from '../components/LearningFingers.jsx'
import {
  setLessonFingersSetSize,
  setLettersFingersLearningMode,
  generateLessonFromFingersMode,
  updateFromLearningModeCharToType
} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    fingersSetSize: state.learningMode.fingersSetSize,
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFingersSetSize: (size) => {
      dispatch(setLessonFingersSetSize(size));

      dispatch(generateLessonFromFingersMode());

      dispatch(updateFromLearningModeCharToType());
    },
    setLetters: (letters) => {
      dispatch(setLettersFingersLearningMode(letters));

      dispatch(generateLessonFromFingersMode());

      dispatch(updateFromLearningModeCharToType());
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFingers)
