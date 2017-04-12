import { connect } from 'react-redux';
import Login from '../../components/auth/Login.jsx';
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
)(Login);




