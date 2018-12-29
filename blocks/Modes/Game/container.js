import { connect } from 'react-redux';

import Component from './component';

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    console.log('start');


  },
  finish: () => {
    console.log('finish');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
