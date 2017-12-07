import React, { Component } from 'react';

import Statistic from '../Statistic/component.jsx';

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

      <div key="textarea" className="textarea">
        <div className="textarea__content" ref={el => { this.content = el; }}>
          <span className="textarea__typed">{typed}</span>
          <span className="textarea__cursor" ref={el => { this.cursor = el; }} />
          <span className="textarea__non-typed">{nonTyped}</span>
        </div>
      </div>,
    ];
  }
}

export default TextArea;
