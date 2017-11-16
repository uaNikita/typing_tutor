import { connect } from 'react-redux';
import { fetchJSON, setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { setAllData } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => ({
  isModal: state.getIn(['main', 'isModal']),
});

const mapDispatchToProps = dispatch => ({
  fetchJSON: (...args) => dispatch(fetchJSON(...args)),
  setData: ({ tokens: { refresh, access }, ...rest }) => {
    dispatch(setRefreshToken(refresh));

    dispatch(setAccessToken(access));

    dispatch(setAllData(rest));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
