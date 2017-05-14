import { connect } from 'react-redux';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm.jsx';
import { openModal } from '../../redux/modules/modal';

const mapStateToProps = (state) => {
   return {};
};

const mapDispatchToProps = (dispatch) => {
   return {
      openModal: (name) => {
         dispatch(openModal(name));
      }
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ForgotPasswordForm);
