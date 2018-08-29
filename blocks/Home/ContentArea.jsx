import { Component } from 'react';
import _ from 'lodash';

class Block extends Component {
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

    if (e.which !== 32) {
      this.setStartTypingTime();

      typeChar(String.fromCharCode(e.which));
    }
  };
}

export default Block;
