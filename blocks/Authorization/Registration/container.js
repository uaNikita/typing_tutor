import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { openModal } from 'ReduxUtils/modules/modal';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  asyncValidate: values => dispatch(fetchJSON('check-email', {
    body: {
      email: values.get('email'),
    },
  }))
    .then(() => {})
    .catch(({ errors }) => {
      if (errors) {
        throw errors;
      }
    }),
  openModal: name => {
    dispatch(openModal(name));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
