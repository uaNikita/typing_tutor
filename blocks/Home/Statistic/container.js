import _ from 'lodash';
import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const sessionStatistic = state.getIn(['main', 'sessionStatistic']).toJS();

  return {
    startTypingTime: sessionStatistic.start,
    hits: _.sumBy(sessionStatistic.hits, o => o.presses),
    errors: _.sumBy(sessionStatistic.typos, o => o.presses),
  };
};

export default connect(
  mapStateToProps,
)(Component);
