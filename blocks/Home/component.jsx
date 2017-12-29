import React, { Component } from 'react';
import _ from 'lodash';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Header from './Header/component.jsx';

class Home extends Component {
  componentDidMount() {
    this.setStartTypingTime();

    document.addEventListener('keydown', e => {
      this.setStartTypingTime();

      this.keyDownHandler(e);
    });
    document.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);
  }

  setStartTypingTime = _.once(() => this.props.setStartTypingTime(Date.now()));

  keyDownHandler = e => {
    if (e.which === 32) {
      e.preventDefault();

      this.props.typeChar(String.fromCharCode(e.which));
    }
  };

  keyPressHandler = e => {
    if (e.which !== 32) {
      this.props.typeChar(String.fromCharCode(e.which));
    }
  };

  render() {
    const { mode } = this.props;

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
      area,
      <Keypad key="keypad" />,
    ];
  }
}

export default Home;
