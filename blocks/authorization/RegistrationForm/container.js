import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { openModal } from 'ReduxUtils/modules/modal';
import RegistrationForm from './component.jsx';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => {
    dispatch(fetchJSON(...args));
  },
  openModal: name => {
    dispatch(openModal(name));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(RegistrationForm);
