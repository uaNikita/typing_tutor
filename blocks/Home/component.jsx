import React, { Component } from 'react';
import _ from 'lodash';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Statistic from './Statistic/container';
import Header from './Header/component.jsx';

class Home extends Component {
  state = {
    startTypingTime: undefined,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    this.props.zeroingStatic();
  }

  setStartTypingTime = _.once(() => this.setState({ startTypingTime: Date.now() }));

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
      props: {
        mode,
      },
      state: {
        startTypingTime,
      },
    } = this;

    let area;

    switch (mode) {
      case 'text':
        area = <TextArea key="textarea" />;
        break;
      case 'learning':
        area = <LearningArea key="learningarea" />;
        break;
    }

    return [
      <Header key="header" />,
      <Statistic key="statistic" startTypingTime={startTypingTime} />,
      area,
      <Keypad key="keypad" />,
    ];
  }
}

export default Home;
