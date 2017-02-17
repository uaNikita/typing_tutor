import {connect} from 'react-redux';
import {assign, concat} from 'lodash';

import LearningMode from '../components/LearningMode.jsx';

import {setModeAndUpdateKeysToType} from '../redux/modules/main';
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
         dispatch(setModeAndUpdateKeysToType(mode));
      }
   };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode);