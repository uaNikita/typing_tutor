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
    isSettingOpen: false,
  };

  componentDidMount = () => {
    window.addEventListener('blur', this.windowBlurHandler);

    window.addEventListener('focus', this.windowFocusHandler);

    this.audio = new Audio('media/metronome.mp3');
  };


  componentWillUnmount = () => {
    window.removeEventListener('blur', this.windowBlurHandler);

    window.removeEventListener('focus', this.windowFocusHandler);
  }

  onClickHandler = () => {
    const {
      props: {
        metronome: {
          on: onPrev,
        },
        setMetronomeOptions,
      },
    } = this;

    const on = !onPrev;

    if (on) {
      this.play();
    }
    else {
      this.stop();
    }

    setMetronomeOptions({
      on,
    });
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

  onChangeHandler = value => {
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
      props: {
        metronome: {
          on,
        },
      },
    } = this;


    if (on) {
      clearTimeout(this.timeout);

      audio.pause();
    }
  };

  windowFocusHandler = () => {
    const {
      props: {
        metronome: {
          on,
        },
      },
    } = this;

    if (on) {
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
          on,
        },
      },
      state: {
        isSettingOpen,
      },
    } = this;

    const btnClass = classNames('drop-down__button fas', on ? 'fa-pause' : 'fa-play');

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
          title="Metronome"
          aria-label="Metronome"
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
