import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Textarea from '../Textarea/container';
import Learningarea from '../Learningarea/container';
import Keypad from '../Keypad/container';
import Metronome from '../Metronome/container';
import UserMenu from '../UserMenu/container';

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
    this.home.addEventListener('keydown', this.keyDownHandler);
    this.home.addEventListener('keypress', this.keyPressHandler);

    this.props.updateStartVariables();
  }

  componentWillUnmount() {
    this.home.removeEventListener('keydown', this.keyDownHandler);
    this.home.removeEventListener('keypress', this.keyPressHandler);

    this.props.refreshCurrentLesson();
  }

  render() {
    let area;

    const {
      successTypes,
      errorTypes,
      speed,
      mode,
      email,
    } = this.props;

    switch (mode) {
      case 'text':
        area = <Textarea />;
        break;
      case 'learning':
        area = <Learningarea />;
        break;
    }

    return (
      <div ref={el => { this.home = el; }}>
        <div styleName="head">
          <Link styleName="settings" className="fa fa-bars" to="/learning-mode" />

          <div styleName="buttons">
            {email && <Metronome />}
            <UserMenu />
          </div>

        </div>

        <div styleName="typing-info">
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
        </div>

        {area}

        <Keypad />
      </div>
    );
  }
}

export default CSSModules(Home, styles);
