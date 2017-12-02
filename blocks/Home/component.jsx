import React, { Component } from 'react';

import Textarea from 'Blocks/Textarea/container';
import Learningarea from 'Blocks/Learningarea/container';
import Keypad from 'Blocks/Keypad/container';
import Header from './Header/component.jsx';

import styles from './home.module.styl';

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
    let area;

    const {
      successTypes,
      errorTypes,
      speed,
      mode,
    } = this.props;

    switch (mode) {
      case 'text':
        area = <Textarea key="textarea" />;
        break;
      case 'learning':
        area = <Learningarea key="learningarea" />;
        break;
    }

    return [
      <Header key="header" />,

      <div key="typing-info" className={styles['typing-info']}>
        <p className="num-chars">
          <i className="fa fa-file-text-o num-chars__icon" />
          {successTypes}
        </p>

        <p className="speed">
          <i className="fa fa-tachometer speed__icon" />
          {speed} зн/мин
        </p>

        <p className="error-key">
          <i className="fa fa-minus-square-o error-key__icon" />
          {errorTypes}
        </p>
      </div>,

      area,

      <Keypad key="keypad" />,
    ];
  }
}

export default Home;
