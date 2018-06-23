import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import styles from './textarea.module.styl';

class TextArea extends Component {
  componentDidMount = () => {
    this.content.addEventListener('keydown', this.keyDownHandler);

    this.ps = new PerfectScrollbar(this.content);

    this.update();
  };

  componentDidUpdate = () => this.update();

  componentWillUnmount() {
    this.content.removeEventListener('keydown', this.keyDownHandler);

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

    const value = this.cursor.offsetTop - this.content.offsetTop - 80;

    this.content.scrollTop = value;
  };


  keyDownHandler = e => {
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
        <div className={styles.content} ref={el => { this.content = el; }}>
          <span className={styles.typed}>
            {typed}
          </span>
          <span className="cursor" ref={el => { this.cursor = el; }} />
          {nonTyped}
        </div>
      </div>
    );
  }
}

export default TextArea;
