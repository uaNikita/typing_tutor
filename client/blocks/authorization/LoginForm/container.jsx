import { connect } from 'react-redux';
import LoginForm from './component.jsx';
import { openModal } from 'Redux/modules/modal';

const mapDispatchToProps = (dispatch) => {
   return {
      openModal: (name) => {
         dispatch(openModal(name));
      }
   };
};

export default connect(
   null,
   mapDispatchToProps
)(LoginForm);




