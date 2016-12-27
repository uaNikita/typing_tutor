import {connect} from 'react-redux'
import {find, concat} from 'lodash';
import LearningFingers from '../components/LearningFingers.jsx'
import {
  setFingersSetSize,
  setFingersLesson,
  setCurrentLesson,
  updateCharToType
} from '../actions/learning-mode'

import {getFingersSet, generateLesson} from "../utils";

const mapStateToProps = (state) => {
   return {
      fingersSetSize: state.learningMode.fingersSetSize,
      maxWordLength: state.learningMode.maxWordLength,
      keys: find(state.main.keyboards, {'name': state.main.keyboard}).keys
   }
};

const mergeProps = (stateProps, dispatchProps) => {

   const {fingersSetSize, maxWordLength, keys} = stateProps;

   const {dispatch} = dispatchProps;

   return {
      fingersSetSize,
      keys,
      setFingersSetSize: (size) => {
         dispatch(setFingersSetSize(size));

         let lettersSet = getFingersSet();

         lettersSet.splice(size);

         lettersSet = concat.apply(null, lettersSet);

         let lesson = generateLesson(maxWordLength, lettersSet);

         dispatch(setFingersLesson(lesson));

         dispatch(setCurrentLesson(lesson));

         dispatch(updateCharToType());
      }
   };

};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(LearningFingers);