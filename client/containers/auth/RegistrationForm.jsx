import { connect } from 'react-redux';
import Register from '../../components/auth/Register.jsx';
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
)(Register);
