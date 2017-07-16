import { connect } from 'react-redux';
import { openModal } from 'Redux/modules/modal';
import RegistrationForm from './component.jsx';

const mapDispatchToProps = dispatch => (
  {
    openModal: name => {
      dispatch(openModal(name));
    },
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(RegistrationForm);