import React, { Fragment } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import PerfectScrollbar from 'perfect-scrollbar';

import Loader from 'Blocks/Loader/component';
import PureString from 'Blocks/PureString';
import ContentArea from '../../ContentArea';
import Actions from '../../Actions/container';
import Keypad from '../../Keypad/container';

import styles from './text-area.module.styl';

class Block extends ContentArea {
  cursor = React.createRef();

  content = React.createRef();

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

  shouldComponentUpdate = (nextProps) => {
    const propsToPick = ['text', 'hiddenChars'];
    const pikedProps = _.pick(this.props, propsToPick);
    const pikedNextProps = _.pick(nextProps, propsToPick);

    if (_.isEqual(pikedProps, pikedNextProps)) {
      return false;
    }

    return true;
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

    const className = classNames('hidden-characters', {
      'hidden-characters_show': hiddenChars,
    });

    return (
      <Fragment>
        <Actions />
        <div className={className} styleName="textarea">
          <p styleName="content" ref={this.content}>
            {text
              ? (
                <Fragment>
                  <PureString
                    styleName="typed"
                    string={text.typed}
                    hiddenChars
                  />

                  <span className="cursor" ref={this.cursor} />

                  <PureString
                    string={text.last}
                    hiddenChars
                  />
                </Fragment>
              )
              : <Loader size="30" />
            }
          </p>
        </div>
        <Keypad />
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles);
