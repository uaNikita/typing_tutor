import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { validateEmail } from 'Utils/validation';
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
    .then(res => {
      if (res.status === 404) {
        const error = {
          email: validateEmail.nonExistError,
        };

        throw error;
      }
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
