import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const stateTextMode = state.get('textMode');

  const text = stateTextMode.get('entities').filter(obj => obj.id === stateTextMode.selectedId).get(0);

  return {
    typed: text.get('typed'),
    nonTyped: text.get('last'),
  };
};

export default connect(
  mapStateToProps,
)(Component);
