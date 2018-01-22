import _ from 'lodash';
import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const sessionStatistic = state.getIn(['main', 'sessionStatistic']);

  return {
    startTypingTime: sessionStatistic.get('start'),
    hits: _.sumBy(sessionStatistic.get('hits'), o => o.presses),
    errors: _.sumBy(sessionStatistic.get('typos'), o => o.presses),
  };
};

export default connect(
  mapStateToProps,
)(Component);
