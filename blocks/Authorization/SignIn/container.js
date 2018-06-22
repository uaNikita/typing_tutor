import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/reducers/fetch';
import { setAllWithAuth } from 'ReduxUtils/reducers/main';
import { validateEmail } from 'Utils/validation';
import Component from './component.jsx';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setAllWithAuth: (...args) => dispatch(setAllWithAuth(...args)),
  asyncValidate: values => dispatch(fetchJSON('/auth/check-email', {
    body: {
      email: values.get('email'),
    },
  }))
    .then(res => {
      if (res === 'Not Found') {
        const error = {
          email: validateEmail.nonExistError,
        };

        throw error;
      }
    }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
