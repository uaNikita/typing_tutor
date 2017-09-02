import { connect } from 'react-redux';

import { openModal } from 'ReduxUtils/modules/modal';
import LoginForm from './component.jsx';

const mapDispatchToProps = dispatch => ({
  openModal: name => {
    dispatch(openModal(name));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
