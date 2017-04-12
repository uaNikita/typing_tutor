import { connect } from 'react-redux';
import RegistrationForm from '../../components/auth/RegistrationForm.jsx';
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
)(RegistrationForm);
