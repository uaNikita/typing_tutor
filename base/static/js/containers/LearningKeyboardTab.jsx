import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningKeyboardTab from '../components/LearningKeyboardTab.jsx'
import {
  addLetterToLesson,
  removeLetterFromLesson,
  updateLesson
} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys,
    letters: state.learningMode.letters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLetter: (letter) => {
      dispatch(addLetterToLesson(letter))

      dispatch(updateLesson())
    },
    removeLetter: (letter) => {
      dispatch(removeLetterFromLesson(letter))

      dispatch(updateLesson())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningKeyboardTab)
