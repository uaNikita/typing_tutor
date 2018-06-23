import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
// import noUiSlider from 'nouislider';
// import { debounce } from 'lodash';
import classNames from 'classnames';

import styles from './metronome.module.styl';

class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 0,
    };

    // this.audio = new Audio('media/metronome2.mp3');
  }

  componentDidMount() {
    // const { interval, actionMetronome } = this.props;

    // noUiSlider.create(this.metronomeRange, {
    //   start: interval,
    //   range: {
    //     min: 200,
    //     max: 2000,
    //   },
    // });
    //
    // this.metronomeRange.noUiSlider.on('update', debounce((values, handle) => {
    //   const val = parseInt(values[handle], 10);
    //
    //   actionMetronome('interval', val);
    // }, 100));
  }

  componentDidUpdate() {
    const {
      state: {
        status,
      },
    } = this;

    if (status) {
      this.playWithInterval();
    }
    else {
      this.stopPlaying();
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

    const btnClass = classNames('fa', status ? 'fa-pause' : 'fa-play');

    return (
      <div styleName="metronome">
        <button type="button" styleName="metronome__btn" className={btnClass} onClick={this.onClickHandler} />

        <div styleName="metronome__range-wrap">
          <h5 styleName="metronome__title">
            Volume
          </h5>
          <div ref={c => { this.metronomeRange = c; }} />
        </div>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
