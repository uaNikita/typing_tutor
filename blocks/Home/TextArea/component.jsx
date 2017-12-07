import React, { Component } from 'react';

import Statistic from '../Statistic/component.jsx';

import styles from './textarea.module.styl';

class TextArea extends Component {
  // componentDidMount() {
  //   const $content = $(this.content);
  //
  //   const cursorOffsetTop = $(this.cursor).offset().top;
  //
  //   $content.scrollTop(cursorOffsetTop - $content.offset().top - 80);
  //
  //   $content.perfectScrollbar();
  // }

  render() {
    const { successTypes, speed, errorTypes, typed, nonTyped } = this.props;

    return [
      <Statistic key="statistic" hits={successTypes} speed={speed} errors={errorTypes} />,

      <div key="textarea" className={styles.textarea}>
        <div className={styles.content} ref={el => { this.content = el; }}>
          <span className={styles.typed}>{typed}</span>
          <span className="cursor" ref={el => { this.cursor = el; }} />
          {nonTyped}
        </div>
      </div>,
    ];
  }
}

export default TextArea;
