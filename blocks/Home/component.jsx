import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Statistic from './Statistic/container';
import Header from './Header/component';

class Home extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);
  }

  componentWillUnmount() {
    const {
      props: {
        zeroingStatic,
      },
    } = this;

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    zeroingStatic();
  }

  setStartTypingTime = (() => {
    const {
      props: {
        setStartTypingTime,
      },
    } = this;

    return _.once(() => setStartTypingTime(Date.now()));
  })();

  keyDownHandler = (e) => {
    const {
      props: {
        typeChar,
      },
    } = this;

    if (e.which === 32) {
      e.preventDefault();

      this.setStartTypingTime();

      typeChar(String.fromCharCode(e.which));
    }
  };

  keyPressHandler = (e) => {
    const {
      props: {
        typeChar,
      },
    } = this;

    this.setStartTypingTime();

    typeChar(String.fromCharCode(e.which));
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

      default:
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
