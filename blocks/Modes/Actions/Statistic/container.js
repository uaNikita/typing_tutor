import _ from 'lodash';
import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = state => {
  const sessionStatistic = state.getIn(['main', 'sessionStatistic']);
  const presses = sessionStatistic.get('presses').toJS();

  return {
    startTypingTime: sessionStatistic.get('start'),
    hits: _.sumBy(presses, o => o.hits) || 0,
    typos: _.sumBy(presses, o => o.typos) || 0,
  };
};

export default connect(
  mapStateToProps,
)(Component);
