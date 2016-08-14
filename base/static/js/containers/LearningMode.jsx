import { connect } from 'react-redux'
import LearningMode from '../components/LearningMode.jsx'
import { setLessonAlphabetSize, setLessonMaxWordLength } from '../actions/actions.js'

const mapStateToProps = (state) => {

  return {
    alphabetSize: state.learningAlphabetSize,
    maxWordLength: state.learningMaxWordLength,
    lesson: state.learningLesson.typed + state.learningLesson.last,
    keyboardName: state.keyboardName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlphabetSize: (alphabetSize) => {
      dispatch(setLessonAlphabetSize(alphabetSize))
    },
    setMaxWordLength: (maxWordLength) => {
      dispatch(setLessonMaxWordLength(maxWordLength))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode)
