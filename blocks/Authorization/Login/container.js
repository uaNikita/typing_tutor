import { connect } from 'react-redux';
import { fetchJSON, setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { setAllData } from 'ReduxUtils/modules/main';
import { validateEmail } from 'Utils/validation';
import Component from './component.jsx';

const mapStateToProps = state => ({
  lastNoModalLocation: state.getIn(['main', 'lastNoModalLocation']),
  isModal: state.getIn(['main', 'isModal']),
});

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setData: ({ tokens: { refresh, access }, ...rest }) => {
    dispatch(setRefreshToken(refresh));

    dispatch(setAccessToken(access));

    dispatch(setAllData(rest));
  },
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
  mapStateToProps,
  mapDispatchToProps,
)(Component);
