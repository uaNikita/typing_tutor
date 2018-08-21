import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { CSSTransition } from 'react-transition-group';
import Slider from 'rc-slider';
// import { debounce } from 'lodash';
import classNames from 'classnames';

import styles from './metronome.module.styl';

class Block extends Component {
  state = {
    status: 0,
    isSettingOpen: false,
  };

  componentDidUpdate() {
    const {
      state: {
        status,
      },
    } = this;

    if (status) {
      // this.playWithInterval();
    }
    else {
      // this.stopPlaying();
    }
  }

  onClickHandler = () => {
    this.setState(prevState => ({
      status: !prevState.status,
    }));
  };

  playFromBegin() {
    const { audio } = this;

    audio.pause();

    setTimeout(() => {
      audio.currentTime = 0;
      audio.play();
    }, 100);
  }

  playWithInterval() {
    const self = this;
    const { interval } = this.props;

    const loop = () => {
      self.timeout = setTimeout(() => {
        self.playFromBegin();

        loop();
      }, interval);
    };

    loop();
  }

  stopPlaying() {
    clearTimeout(this.timeout);

    this.audio.pause();
  }

  onMouseEnterHandler = () => {
    this.setState({
      isSettingOpen: true,
    });
  }

  onMouseLeaveHandler = () => {
    this.setState({
      isSettingOpen: false,
    });
  }

  render() {
    const {
      state: {
        status,
        isSettingOpen,
      },
    } = this;

    const btnClass = classNames('drop-down__button fa', status ? 'fa-pause' : 'fa-play');

    return (
      <div className="drop-down" styleName="metronome">
        <button
          type="button"
          className={btnClass}
          styleName="btn"
          onClick={this.onClickHandler}
          onMouseEnter={this.onMouseEnterHandler}
          onMouseLeave={this.onMouseLeaveHandler}
        />

        <CSSTransition
          in={isSettingOpen}
          timeout={3000}
          classNames="message"
          unmountOnExit
        >
          {state => {
            console.log('state', state);

            return <div>{state}</div>
          }}
        </CSSTransition>

        <div className="drop-down__dd" styleName="range-wrap">
          <h5 styleName="title">
            Volume
          </h5>

          <Slider styleName="slider" vertical min={0} max={100} defaultValue={50} />
        </div>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
