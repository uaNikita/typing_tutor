import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import styles from './textarea.module.styl';

class TextArea extends Component {
  constructor(props) {
    super(props);

    this.cursor = React.createRef();
    this.content = React.createRef();
  }

  componentDidMount = () => {
    this.content.current.addEventListener('keydown', this.keyDownHandler);

    this.ps = new PerfectScrollbar(this.content.current);

    this.update();
  };

  componentDidUpdate = () => this.update();

  componentWillUnmount() {
    this.content.current.removeEventListener('keydown', this.keyDownHandler);

    this.ps.destroy();

    // to make sure garbages are collected
    this.ps = null;
  }

  update = () => {
    const {
      props: {
        updateCharToType,
      },
    } = this;

    updateCharToType();

    const value = this.cursor.current.offsetTop - this.content.current.offsetTop - 80;

    this.content.current.scrollTop = value;
  };


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


  render() {
    const { typed, nonTyped } = this.props;

    return (
      <div key="textarea" className={styles.textarea}>
        <div className={styles.content} ref={this.content}>
          <span className={styles.typed}>
            {typed}
          </span>
          <span className="cursor" ref={this.cursor} />
          {nonTyped}
        </div>
      </div>
    );
  }
}

export default TextArea;
