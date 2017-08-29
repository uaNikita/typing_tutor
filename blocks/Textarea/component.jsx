import React, { Component } from 'react';
import $ from 'jquery';

class Textarea extends Component {
  componentDidMount() {
    const $content = $(this.content);

    const cursorOffsetTop = $(this.cursor).offset().top;

    $content.scrollTop(cursorOffsetTop - $content.offset().top - 80);

    $content.perfectScrollbar();
  }

  render() {
    const { typed, nonTyped } = this.props;

    return (
      <div className="textarea">
        <div className="textarea__content" ref={el => { this.content = el; }}>
          <span className="textarea__typed">{typed}</span>
          <span className="textarea__cursor" ref={el => { this.cursor = el; }} />
          <span className="textarea__non-typed">{nonTyped}</span>
        </div>
      </div>
    );
  }
}

export default Textarea;
