import React, { Component } from 'react';
import _ from 'lodash';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Statistic from './Statistic/component.jsx';
import Header from './Header/component.jsx';

class Home extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);
  }

  setStartTypingTime = _.once(() => {
    this.startTypingTime = Date.now();
  });

  keyDownHandler = e => {
    if (e.which === 32) {
      e.preventDefault();

      this.setStartTypingTime();

      this.props.typeChar(String.fromCharCode(e.which));
    }
  };

  keyPressHandler = e => {
    this.setStartTypingTime();

    this.props.typeChar(String.fromCharCode(e.which));
  };

  render() {
    const {
      mode,
      successTypes,
      errorTypes,
    } = this.props;

    let area;

    switch (mode) {
      case 'text':
        area = <TextArea key="textarea" />;
        break;
      case 'learning':
        area = <LearningArea key="learningarea" />;
        break;
    }

    let speed = '-';

    if (this.startTypingTime) {
      speed = (Date.now() - this.startTypingTime) / (1000 * 60);
    }

    return [
      <Header key="header" />,
      <Statistic key="statistic" hits={successTypes} speed={speed} errors={errorTypes} />,
      area,
      <Keypad key="keypad" />,
    ];
  }
}

export default Home;
