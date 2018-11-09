import React from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import { getHiddenCharacters } from 'Utils';

import ContentArea from '../ContentArea';

import styles from './learning-area.module.styl';

class Block extends ContentArea {
  state = {
    prevPropsLesson: undefined,
    typed: undefined,
    rest: undefined,
  }

  static getDerivedStateFromProps(props, state) {
    const { lesson } = props;
    let result = null;

    // not equal can be only in one case when right character is typed
    if (!_.isEqual(lesson, state.prevPropsLesson)) {
      result = {
        prevPropsLesson: lesson,
      };

      if (state.prevPropsLesson) {
        result.typed = state.typed.concat(state.rest[0]);
        result.rest = state.rest.slice(1);
      }
      else {
        result.typed = getHiddenCharacters(lesson.typed);
        result.rest = getHiddenCharacters(lesson.rest);
      }
    }

    return result;
  }

  componentDidMount = () => {
    const {
      props: {
        updateCharToType,
      },
    } = this;
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    updateCharToType();
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
  }

  render() {
    const {
      props: {
        hiddenChars,
      },
      state: {
        typed,
        rest,
      },
    } = this;

    const className = classNames('hidden-characters', {
      'hidden-characters_show': hiddenChars,
    });

    return (
      <div className={className} styleName="learningarea">
        {/* eslint-disable-next-line react/no-danger */}
        <span styleName="typed" dangerouslySetInnerHTML={{ __html: typed.join('') }} />
        <span styleName="cursor" />
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: rest.join('') }} />
      </div>
    );
  }
}

export default CSSModules(Block, styles);
