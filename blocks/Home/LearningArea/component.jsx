import React, { Component } from 'react';

import LearningView from 'Blocks/LearningView/component.jsx';

class LearningArea extends Component {
  componentDidMount = () =>
    this.props.updateCharToType()

  render() {
    const {
      props: {
        lessonTyped: typed,
        lessonRest: rest,
      },
    } = this;

    return <LearningView key="learningview" lesson={{ typed, rest }} />;
  }
}

export default LearningArea;
