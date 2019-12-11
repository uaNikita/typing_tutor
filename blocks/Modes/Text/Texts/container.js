import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => {
  const entities = state.getIn(['text', 'entities']);
  let texts;

  if (entities) {
    texts = entities.toJS().map(obj => ({
      id: obj.id,
      content: obj.typed + obj.last,
    }));
  }

  return ({
    texts,
    selectedId: state.getIn(['text', 'selectedId']),
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    dispatch(processSetSettings({
      mode: 'text',
    }));

    ownProps.history.push('/');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
