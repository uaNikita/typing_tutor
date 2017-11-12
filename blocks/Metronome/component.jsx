import React, { Component } from 'react';
import noUiSlider from 'nouislider';
import { debounce } from 'lodash';
import classNames from 'classnames';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 0,
    };

    // this.audio = new Audio('media/metronome2.mp3');
  }

  componentDidMount() {
    const { interval, actionMetronome } = this.props;

    noUiSlider.create(this.metronomeRange, {
      start: interval,
      range: {
        min: 200,
        max: 2000,
      },
    });

    this.metronomeRange.noUiSlider.on('update', debounce((values, handle) => {
      const val = parseInt(values[handle], 10);

      actionMetronome('interval', val);
    }, 100));
  }

  componentDidUpdate() {
    if (this.state.status) {
      this.playWithInterval();
    }
    else {
      this.stopPlaying();
    }
  }

  onClickHandler = () => {
    this.setState({
      status: !this.state.status,
    });
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
    let btnClass = 'metronome__btn fa';

    if (this.state.status) {
      btnClass = classNames(btnClass, 'fa-pause');
    }
    else {
      btnClass = classNames(btnClass, 'fa-play');
    }

    return (
      <div className="metronome">
        <button className={btnClass} onClick={this.onClickHandler} />

        <div className="metronome__range-wrap">
          <h5 className="metronome__title">Volume</h5>
          <div className="metronome__range" ref={c => { this.metronomeRange = c; }} />
        </div>
      </div>
    );
  }
}

export default Metronome;
