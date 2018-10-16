import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';
import PerfectScrollbar from 'perfect-scrollbar';

import ContentToType from 'Blocks/ContentToType/component';
import Loader from 'Blocks/Loader/component';
import ContentArea from '../ContentArea';

import styles from './text-area.module.styl';

class Block extends ContentArea {
  constructor(props) {
    super(props);

    this.cursor = React.createRef();
    this.content = React.createRef();
  }

  componentDidMount = () => {
    const {
      props: {
        text,
      },
    } = this;

    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    this.ps = new PerfectScrollbar(this.content.current);

    if (text) {
      this.update();
    }
  };

  componentDidUpdate = (prevProps) => {
    const {
      props: {
        text,
      },
      update,
    } = this;

    if (
      (!prevProps.text && text)
      || (prevProps.text && text && prevProps.text.last !== text.last)
    ) {
      update();
    }
  };

  componentWillUnmount() {
    const {
      props: {
        zeroingStatic,
      },
    } = this;

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    zeroingStatic();

    this.ps.destroy();

    // to make sure garbages are collected
    this.ps = null;
  }

  update = () => {
    const {
      props: {
        updateCharToType,
        text,
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

    if (text.last) {
      content.scrollTop = cursor.offsetTop - content.offsetTop - 80;
    }
    else {
      content.removeEventListener('keydown', keyDownHandler);
    }
  };

  render() {
    const {
      props: {
        text,
        hiddenChars,
      },
    } = this;

    return (
      <div styleName="textarea">
        <p styleName="content" ref={this.content}>
          {text
            ? (
              <Fragment>
                <span styleName="typed">
                  <ContentToType hidden={hiddenChars}>
                    {text.typed}
                  </ContentToType>
                </span>
                <Fragment>
                  <span className="cursor" ref={this.cursor} />
                  <ContentToType hidden={hiddenChars}>
                    {text.last}
                  </ContentToType>
                </Fragment>
              </Fragment>
            )
            : <Loader />
          }
        </p>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
