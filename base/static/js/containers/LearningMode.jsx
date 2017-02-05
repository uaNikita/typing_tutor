import {connect} from 'react-redux';
import {assign, concat} from 'lodash';

import LearningMode from '../components/LearningMode.jsx';

import {setMode} from '../redux/modules/main';

const mapStateToProps = (state) => {
   return {
      lesson: state.learningMode.lesson.last,
      learningMode: state.learningMode.mode,
      mode: state.main.mode
   };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {

   const {dispatch} = dispatchProps;

   return assign({}, stateProps, ownProps, {
      setMode: (mode) => {
         dispatch(setMode(mode));
      }
   });

};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(LearningMode);