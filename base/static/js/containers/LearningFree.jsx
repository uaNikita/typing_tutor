import {connect} from 'react-redux';
import {find} from 'lodash';
import LearningFree from '../components/LearningFree.jsx';
import {
   addLetterToFreeLetters,
   removeLetterFromFreeLetters,
   generateAndSetFreeLesson,
   setMaxLettersInWordFingers
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

         dispatch(generateAndSetFreeLesson());
      },
      removeLetter: (letter) => {
         dispatch(removeLetterFromFreeLetters(letter));

         dispatch(generateAndSetFreeLesson());
      },
      setMaxLettersInWord: (length) => {

         dispatch(setMaxLettersInWordFingers(length));

         dispatch(generateAndSetFreeLesson());
      }
   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFree);
