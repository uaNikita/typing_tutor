import { connect } from 'react-redux';

import LearningMode from '../components/LearningMode.jsx';
import { setMode } from '../redux/modules/main';
import {
   setMode as setLearningMode,
   updateCurrentLessonFromCurrentMode,
   updateCharToType
} from '../redux/modules/learning-mode';


const mapStateToProps = (state) => {

   const stateLearningMode = state.get('learningMode');

   return {
      lesson: stateLearningMode.get('lessonRest'),
      learningMode: stateLearningMode.get('mode'),
      mode: state.getIn(['main', 'mode'])
   };

};

const mapDispatchToProps = (dispatch) => {
   return {

      setMode(mode) {
         dispatch(setMode(mode));
      },

      setLearningMode(learningMode) {
         dispatch(setLearningMode(learningMode));
      },

      updateCurrentLessonFromCurrentMode() {
         dispatch(updateCurrentLessonFromCurrentMode());
      },

      updateCharToType() {
         dispatch(updateCharToType());
      }

   };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {


   // console.log('stateProps', stateProps);
   // console.log('dispatchProps', dispatchProps);

   const { mode } = stateProps;
   const {
      setMode,
      setLearningMode,
      updateCurrentLessonFromCurrentMode,
      updateCharToType
   } = dispatchProps;
   
   return {

      ...stateProps,

      setMainMode(mode) {

         setMode(mode);

         updateCharToType();

      },

      setLearningMode(learningMode) {
         
         setLearningMode(learningMode);

         updateCurrentLessonFromCurrentMode();

         if (mode === 'learning') {
            updateCharToType();
         }
         
      },

      ...ownProps,

   };


};

export default connect(
   mapStateToProps,
   mapDispatchToProps,
   mergeProps
)(LearningMode);