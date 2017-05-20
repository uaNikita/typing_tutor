import {connect} from 'react-redux';
import {find, concat} from 'lodash';
import LearningFingers from './component.jsx';
import {
   setSetSizeFingers,
   setMaxLettersInWordFingers,
   updateFingersLesson,
   updateCurrentLessonFromCurrentMode,
   updateCharToType
} from 'Redux/modules/learning-mode';

import {getFingersSet} from "../../../utils";

const mapStateToProps = (state) => {

   const keys = state.getIn(['main', 'keys']).toJS();
   
   const stateLearningMode = state.get('learningMode');

   return {
      setSizeFingers: stateLearningMode.get('setSizeFingers'),
      maxLettersInWord: stateLearningMode.get('maxLettersInWordFingers'),
      fingersSet: getFingersSet(keys),
      keys
   };

};

const mapDispatchToProps = (dispatch) => {
   return {
      setFingersSetSize: (size) => {

         dispatch(setSetSizeFingers(size));

         dispatch(updateFingersLesson());

         dispatch(updateCurrentLessonFromCurrentMode());

         dispatch(updateCharToType());

      },
      setMaxLettersInWord: (length) => {

         dispatch(setMaxLettersInWordFingers(length));

         dispatch(updateFingersLesson());

         dispatch(updateCurrentLessonFromCurrentMode());

         dispatch(updateCharToType());

      }
   };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningFingers);