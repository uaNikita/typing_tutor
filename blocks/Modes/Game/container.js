import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state) => {
  return ({
    language: 'ru',
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    console.log('start');
  },
  finish: () => {
    console.log('finish');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
