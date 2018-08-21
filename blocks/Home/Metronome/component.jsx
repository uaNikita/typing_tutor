import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Slider from 'rc-slider';
// import { debounce } from 'lodash';
import classNames from 'classnames';

import styles from './metronome.module.styl';

const marks = { 0: '', 1: '' };

class Block extends Component {
  constructor(props) {
    super(props);

    // this.audio = new Audio('media/metronome2.mp3');
  }

  state = {
    status: 0,
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

  render() {
    const {
      state: {
        status,
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
        />

        <div className="drop-down__dd" styleName="range-wrap">
          <h5 styleName="title">
            Volume
          </h5>

          <Slider vertical min={-10} marks={marks} included={false} defaultValue={0} />
        </div>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
