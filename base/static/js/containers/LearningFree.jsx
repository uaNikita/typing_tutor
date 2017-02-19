import {connect} from 'react-redux';
import {find} from 'lodash';
import LearningFree from '../components/LearningFree.jsx';
import {
   addLetterToFreeLetters,
   removeLetterFromFreeLetters,
   setMaxLettersInWordFree,
   updateFreeLesson,
   updateCurrentLessonFromCurrentMode,
   updateCharToType
} from '../redux/modules/learning-mode';

const mapStateToProps = (state) => {
   return {
      maxLettersInWord: state.learningMode.maxLettersInWordFree,
      keys: state.main.keys,
      letters: state.learningMode.lettersFree
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      addLetter: (letter) => {

         dispatch(addLetterToFreeLetters(letter));

         dispatch(updateFreeLesson());

         dispatch(updateCurrentLessonFromCurrentMode());

         dispatch(updateCharToType());

      },
      removeLetter: (letter) => {

         dispatch(removeLetterFromFreeLetters(letter));

         dispatch(updateFreeLesson());

         dispatch(updateCurrentLessonFromCurrentMode());

         dispatch(updateCharToType());

      },
      setMaxLettersInWord: (length) => {

         dispatch(setMaxLettersInWordFree(length));

         dispatch(updateFreeLesson());

         dispatch(updateCurrentLessonFromCurrentMode());

         dispatch(updateCharToType());

      }
   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFree);
