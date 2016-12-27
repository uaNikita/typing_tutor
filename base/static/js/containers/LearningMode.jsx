import {connect} from 'react-redux';
import LearningMode from '../components/LearningMode.jsx';
import {
  setMaxWordLength,
  setMode as setLearningMode
} from '../actions/learning-mode';

import {setMode} from '../actions/main';

const mapStateToProps = (state) => {
   return {
      maxWordLength: state.learningMode.maxWordLength,
      lesson: state.learningMode.lesson.typed + state.learningMode.lesson.last,
      learningMode: state.learningMode.mode,
      mode: state.main.mode
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      setMaxWordLength: (length) => {
         dispatch(setMaxWordLength(length));
      },
      setLearningMode: (mode) => {
         dispatch(setLearningMode(mode))
      },
      setMode: (mode) => {
         dispatch(setMode(mode))
      }
   }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode)
