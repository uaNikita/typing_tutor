import { connect } from 'react-redux';
import { fetchJSON } from 'ReduxUtils/modules/fetch';
import { validateEmail } from 'Utils/validation';

import Component from './component.jsx';

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
  null,
  mapDispatchToProps,
)(Component);
