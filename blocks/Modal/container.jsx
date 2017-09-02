import { connect } from 'react-redux';

import { closeModal } from 'ReduxUtils/modules/modal';
import Modal from '../Modal/component.jsx';

const mapStateToProps = state => ({
  closable: state.getIn(['modal', 'closable']),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
