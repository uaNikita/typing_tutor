import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import PerfectScrollbar from 'perfect-scrollbar';

import Content from '../Content/container';

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
        last,
      },
      cursor: {
        current: cursor,
      },
      content: {
        current: content,
      },
      keyDownHandler,
    } = this;

    updateCharToType();

    if (last) {
      content.scrollTop = cursor.offsetTop - content.offsetTop - 80;
    }
    else {
      content.removeEventListener('keydown', keyDownHandler);
    }
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
      <div key="textarea" styleName="textarea">
        <pre styleName="content" ref={this.content}>
          {typed && (
            <span styleName="typed">
              <Content string={typed} />
            </span>
          )}
          {last && (
            <Fragment>
              <span className="cursor" ref={this.cursor} />
              <Content string={last} />
            </Fragment>
          )}
        </pre>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
