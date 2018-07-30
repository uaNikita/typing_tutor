import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';
import PerfectScrollbar from 'perfect-scrollbar';

import ContentArea from '../ContentArea';
import Content from '../Content/component';

import styles from './textarea.module.styl';

class Block extends ContentArea {
  constructor(props) {
    super(props);

    this.cursor = React.createRef();
    this.content = React.createRef();
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    // this.content.current.addEventListener('keydown', this.keyDownHandler);

    this.ps = new PerfectScrollbar(this.content.current);

    this.update();
  };

  componentDidUpdate = () => this.update();

  componentWillUnmount() {
    const {
      props: {
        zeroingStatic,
      },
    } = this;

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    zeroingStatic();

    // this.content.current.removeEventListener('keydown', this.keyDownHandler);

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

  render() {
    const {
      props: {
        typed,
        last,
      },
    } = this;

    return (
      <div key="textarea" styleName="textarea">
        <p styleName="content" ref={this.content}>
          {typed && (
            <span styleName="typed">
              <Content>
                {typed}
              </Content>
            </span>
          )}
          {last && (
            <Fragment>
              <span className="cursor" ref={this.cursor} />
              <Content>
                {last}
              </Content>
            </Fragment>
          )}
        </p>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
