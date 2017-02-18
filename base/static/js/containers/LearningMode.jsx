import {connect} from 'react-redux';
import {assign, concat} from 'lodash';

import LearningMode from '../components/LearningMode.jsx';

import {setMode} from '../redux/modules/main';
import {updateCharToType} from '../redux/modules/learning-mode';

const mapStateToProps = (state) => {

   return {
      lesson: state.learningMode.lesson.last,
      learningMode: state.learningMode.mode,
      mode: state.main.mode
   };

};

const mapDispatchToProps = (dispatch) => {
   return {
      setMode: (mode) => {

         dispatch(setMode(mode));

         dispatch(updateCharToType());

      }
   };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode);