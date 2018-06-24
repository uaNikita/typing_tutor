import React, { Component } from 'react';

import LearningView from 'Blocks/LearningView/component';

class LearningArea extends Component {
  componentDidMount = () => {
    const {
      props: {
        refreshInitialData,
      },
    } = this;

    refreshInitialData();
  };

  render() {
    const {
      props: {
        typed,
        rest,
      },
    } = this;

    return <LearningView key="learningview" lesson={{ typed, rest }} />;
  }
}

export default LearningArea;
