import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Statistic from './Statistic/container';
import Header from './Header/component.jsx';

class Home extends Component {
  componentDidMount() {
    this.props.startNewSession();

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    this.props.zeroingStatic();
  }

  setStartTypingTime = _.once(() => this.props.setStartTypingTime(Date.now()));

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
    } = this;

    let area;

    switch (mode) {
      case 'text':
        area = <TextArea />;
        break;
      case 'learning':
        area = <LearningArea />;
        break;
    }

    return (
      <Fragment>
        <Header />
        <Statistic />
        {area}
        <Keypad />
      </Fragment>
    );
  }
}

export default Home;
