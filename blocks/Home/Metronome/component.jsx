import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { CSSTransition } from 'react-transition-group';
import Slider from 'rc-slider';
import _ from 'lodash';
import classNames from 'classnames';

import styles from './metronome.module.styl';

class Block extends Component {
  debouncedEnterHandler = _.debounce(() => {
    if (this.isCursorAbove) {
      this.setState({
        isSettingOpen: true,
      });
    }
  }, 500);

  state = {
    status: 0,
    isSettingOpen: false,
  };

  componentDidMount = () => {
    window.addEventListener('blur', this.windowBlurHandler);

    window.addEventListener('focus', this.windowFocusHandler);

    this.audio = new Audio('media/1.mp3');
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      state: {
        status,
      },
    } = this;

    if (prevState.status !== status) {
      if (status) {
        this.play();

        this.playing = true;
      }
      else {
        this.stop();

        this.playing = false;
      }
    }
  };

  onClickHandler = () => {
    this.setState(prevState => ({
      status: !prevState.status,
    }));
  };

  onMouseEnterHandler = () => {
    this.isCursorAbove = true;

    this.debouncedEnterHandler();
  };

  onMouseLeaveHandler = () => {
    this.isCursorAbove = false;

    this.setState({
      isSettingOpen: false,
    });
  };

  onChangeHandler = (value) => {
    const {
      props: {
        setMetronomeOptions,
      },
    } = this;

    const interval = 2000 - value;

    setMetronomeOptions({
      interval,
    });
  };

  stop = () => {
    const {
      audio,
    } = this;

    if (this.playing) {
      clearTimeout(this.timeout);

      audio.pause();
    }
  };

  windowFocusHandler = () => {
    if (this.playing) {
      this.play();
    }
  };

  windowBlurHandler = () => {
    this.stop();
  };

  play = () => {
    const {
      props: {
        metronome: {
          interval,
        },
      },
      audio,
    } = this;

    audio.currentTime = 0;
    audio.play();

    this.timeout = setTimeout(() => this.play(), interval);
  };

  render() {
    const {
      props: {
        metronome: {
          interval,
        },
      },
      state: {
        status,
        isSettingOpen,
      },
    } = this;

    const btnClass = classNames('drop-down__button fa', status ? 'fa-pause' : 'fa-play');

    return (
      <div
        className="drop-down"
        styleName="metronome"
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
      >
        <button
          type="button"
          className={btnClass}
          styleName="btn"
          onClick={this.onClickHandler}
        />

        <CSSTransition
          in={isSettingOpen}
          timeout={300}
          classNames={{
            enter: styles.enter,
            enterActive: styles['enter-active'],
            exit: styles.exit,
            exitActive: styles['exit-active'],
          }}
          unmountOnExit
        >
          <div className="drop-down__dd" styleName="range-wrap">
            <Slider
              styleName="slider"
              vertical
              min={0}
              max={1700}
              defaultValue={2000 - interval}
              onChange={this.onChangeHandler}
            />
          </div>
        </CSSTransition>

      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
