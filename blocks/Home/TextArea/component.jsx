import React, { Fragment } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import PerfectScrollbar from 'perfect-scrollbar';

import { getHiddenCharacters } from 'Utils';

import Loader from 'Blocks/Loader/component';
import ContentArea from '../ContentArea';

import styles from './text-area.module.styl';

class Block extends ContentArea {
  state = {
    prevPropsText: undefined,
    typed: undefined,
    last: undefined,
  }

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

  shouldComponentUpdate = (nextProps) => {
    const propsToPick = ['text', 'hiddenChars'];
    const pikedProps = _.pick(this.props, propsToPick);
    const pikedNextProps = _.pick(nextProps, propsToPick);

    if (_.isEqual(pikedProps, pikedNextProps)) {
      return false;
    }

    return true;
  }

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

  static getDerivedStateFromProps(props, state) {
    const { text } = props;
    let result = null;

    if (!_.isEqual(text, state.prevPropsText)) {
      result = {
        prevPropsText: text,
      };

      if (state.prevPropsText) {
        result.typed = state.typed.concat(state.last[0]);
        result.last = state.last.slice(1);
      }
      else {
        result.typed = getHiddenCharacters(text.typed);
        result.last = getHiddenCharacters(text.last);
      }
    }

    return result;
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
      state: {
        typed,
        last,
      },
    } = this;

    return (
      <div styleName="textarea">
        <p styleName="content" ref={this.content}>
          {text
            ? (
              <Fragment>
                <span styleName="typed">{typed}</span>
                <span className="cursor" ref={this.cursor} />
                {last}
              </Fragment>
            )
            : <Loader size="30" />
          }
        </p>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
