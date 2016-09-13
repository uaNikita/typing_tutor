import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningLettersSetTab from '../components/LearningLettersSetTab.jsx'
import {setLessonAlphabetSize, updateLesson} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    alphabetSize: state.learningMode.alphabetSize,
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlphabetSize: (size) => {
      dispatch(setLessonAlphabetSize(size));

      dispatch(updateLesson());
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningLettersSetTab)
