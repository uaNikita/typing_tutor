import {connect} from 'react-redux';
import {assign, concat} from 'lodash';

import LearningMode from '../components/LearningMode.jsx';

import {setMaxWordLength, generateAndSetFingersLesson, generateAndSetFreeLesson} from '../actions/learning-mode';
import {setMode} from '../actions/main';

const mapStateToProps = (state) => {
   return {
      maxWordLength: state.learningMode.maxWordLength,
      lesson: state.learningMode.lesson.last,
      learningMode: state.learningMode.mode,
      mode: state.main.mode
   }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {

   const {learningMode} = stateProps;

   const {dispatch} = dispatchProps;

   return assign({}, stateProps, ownProps, {
      setMode: (mode) => {
         dispatch(setMode(mode))
      },
      setMaxWordLength: (length) => {

         dispatch(setMaxWordLength(length));

         switch (learningMode) {
            case 'fingers':

               dispatch(generateAndSetFingersLesson());
              
               break;

            case 'free':

               dispatch(generateAndSetFreeLesson());
              
               break;
         }

      }
   })
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(LearningMode);