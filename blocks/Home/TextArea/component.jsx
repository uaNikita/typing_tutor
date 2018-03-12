import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';

import styles from './textarea.module.styl';

class TextArea extends Component {
  componentDidMount = () => this.init();

  componentDidUpdate = () => this.init();

  init = () => {
    this.props.updateCharToType();

    const value = this.cursor.offsetTop - this.content.offsetTop - 80;

    this.content.scrollTop = value;

    (() => new PerfectScrollbar(this.content))();
  }

  render() {
    const { typed, nonTyped } = this.props;

    return (
      <div key="textarea" className={styles.textarea}>
        <div className={styles.content} ref={el => { this.content = el; }}>
          <span className={styles.typed}>{typed}</span>
          <span className="cursor" ref={el => { this.cursor = el; }} />
          {nonTyped}
        </div>
      </div>
    );
  }
}

export default TextArea;
