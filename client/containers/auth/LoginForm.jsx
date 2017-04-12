import { connect } from 'react-redux';
import LoginForm from '../../components/auth/LoginForm.jsx';
import { openModal } from '../../redux/modules/modal';

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




