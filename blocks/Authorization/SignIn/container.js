import { connect } from 'react-redux';
import { fetchJSON, setTokens, clearAppData } from 'ReduxUtils/reducers/fetch';
import { init, setData } from 'ReduxUtils/reducers/main';
import { validateEmail } from 'Utils/validation';
import Component from './component';

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setTokens: (...args) => dispatch(setTokens(...args)),
  init: (...args) => dispatch(init(...args)),
  setData: (...args) => dispatch(setData(...args)),
  clearAppData: (...args) => dispatch(clearAppData(...args)),
  asyncValidate: values => dispatch(fetchJSON('/auth/check-email', {
    body: {
      email: values.get('email'),
    },
  }))
    .then((res) => {
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
