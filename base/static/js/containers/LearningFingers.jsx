import {connect} from 'react-redux';
import {find, concat} from 'lodash';
import LearningFingers from '../components/LearningFingers.jsx';
import {
   setSetSizeFingers,
   generateAndSetFingersLesson,
   setMaxLettersInWordFingers
} from '../redux/modules/learning-mode';

import {getFingersSet} from "../utils";

const mapStateToProps = (state) => {

   let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;

   return {
      setSizeFingers  : state.learningMode.setSizeFingers,
      maxLettersInWord: state.learningMode.maxLettersInWordFingers,
      fingersSet      : getFingersSet(keys),
      keys
   };

};

const mapDispatchToProps = (dispatch) => {
   return {
      setFingersSetSize: (size) => {
         dispatch(setSetSizeFingers(size));

         dispatch(generateAndSetFingersLesson(size));
      },
      setMaxLettersInWord : (length) => {

         dispatch(setMaxLettersInWordFingers(length));

         dispatch(generateAndSetFingersLesson());

      }
   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFingers);