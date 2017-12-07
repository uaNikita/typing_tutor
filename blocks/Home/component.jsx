import React, { Component } from 'react';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Header from './Header/component.jsx';

class Home extends Component {
  constructor(props) {
    super(props);

    const { typeChar } = this.props;

    this.keyPressHandler = e => {
      if (e.which !== 32) {
        typeChar(String.fromCharCode(e.which));
      }
    };

    this.keyDownHandler = e => {
      if (e.which === 32) {
        e.preventDefault();

        typeChar(String.fromCharCode(e.which));
      }
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    this.props.updateStartVariables();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    this.props.refreshCurrentLesson();
  }

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
