import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningFree from '../components/LearningFree.jsx'
import {
  addLetterToLesson,
  removeLetterFromLesson,
  generateLessonFromCurrentMode
} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys,
    letters: state.learningMode.lettersFreeMode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLetter: (letter) => {
      dispatch(addLetterToLesson(letter))

      dispatch(generateLessonFromCurrentMode())
    },
    removeLetter: (letter) => {
      dispatch(removeLetterFromLesson(letter))

      dispatch(generateLessonFromCurrentMode())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFree)
