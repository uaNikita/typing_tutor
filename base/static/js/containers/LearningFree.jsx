import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningFree from '../components/LearningFree.jsx'
import {
  addLetterToFreeLetters,
  removeLetterFromFreeLetters,
  generateAndSetFreeLesson
} from '../actions/learning-mode'

const mapStateToProps = (state) => {


  return {
    keys: find(state.main.keyboards, {'name': state.main.keyboardName}).keys,
    letters: state.learningMode.lettersFree
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLetter: (letter) => {
      dispatch(addLetterToFreeLetters(letter));

      dispatch(generateAndSetFreeLesson());
    },
    removeLetter: (letter) => {
      dispatch(removeLetterFromFreeLetters(letter));

      dispatch(generateAndSetFreeLesson());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFree)
