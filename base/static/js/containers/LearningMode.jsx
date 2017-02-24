import {connect} from 'react-redux';
import {assign, concat} from 'lodash';

import LearningMode from '../components/LearningMode.jsx';

import {setMode} from '../redux/modules/main';
import {updateCharToType} from '../redux/modules/learning-mode';

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