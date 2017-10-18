import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import Component from './component.jsx';

const mapStateToProps = state => ({
  isModal: state.getIn(['main', 'isModal']),
});

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  asyncValidate: values => dispatch(fetchJSON('/auth/check-email', {
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
