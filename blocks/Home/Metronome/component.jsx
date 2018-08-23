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
    this.audio = new Audio('media/1.mp3');
  };

  componentDidUpdate = (prevProps, prevState) => {
    const {
      state: {
        status,
      },
      audio,
    } = this;

    if (prevState.status !== status) {
      if (status) {
        this.loop();
      }
      else {
        clearTimeout(this.timeout);

        audio.pause();
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

  loop = () => {
    const {
      props: {
        interval,
      },
      audio,
    } = this;

    audio.currentTime = 0;
    audio.play();

    this.timeout = setTimeout(() => this.loop(), interval);
  };

  render() {
    const {
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
            <h5 styleName="title">
              Volume
            </h5>

            <Slider styleName="slider" vertical min={0} max={100} defaultValue={50} />
          </div>
        </CSSTransition>

      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
