import { connect } from 'react-redux';
import ForgotPasswordForm from './component.jsx';
import { openModal } from 'Redux/modules/modal';

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
