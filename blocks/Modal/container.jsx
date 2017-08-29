import { connect } from 'react-redux';

import { closeModal } from 'ReduxUtils/modules/modal';
import Modal from '../Modal/component.jsx';

const mapDispatchToProps = dispatch => (
  {
    closeModal: () => {
      dispatch(closeModal());
    },
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(Modal);
