import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import PerfectScrollbar from 'perfect-scrollbar';

import styles from './textarea.module.styl';

class Block extends Component {
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

    const cursor = this.cursor.current;
    const content = this.content.current;

    const value = cursor.offsetTop - content.offsetTop - 80;

    content.scrollTop = value;
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
    const {
      props: {
        typed,
        last,
      },
    } = this;

    return (
      <div key="textarea" className={styles.textarea}>
        <pre className={styles.content} ref={this.content}>
          <span className={styles.typed}>
            {typed}
          </span>
          <span className="cursor" ref={this.cursor} />
          {last}
        </pre>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
