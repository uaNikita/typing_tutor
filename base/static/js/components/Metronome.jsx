import React, {Component} from 'react';
import noUiSlider from 'nouislider';
import {debounce, isEqual} from 'lodash';
import classNames from 'classNames';

class Metronome extends Component {

  constructor(props) {

    super(props);

    this.state = {
      status: 0
    };

    this.audio = new Audio('media/metronome2.mp3');

  }

  componentDidMount() {

    const {interval, actionMetronome} = this.props;

    noUiSlider.create(this._metronomeRange, {
      start: interval,
      range: {
        'min': 200,
        'max': 2000
      }
    });

    this._metronomeRange.noUiSlider.on('update', debounce((values, handle) => {
      let val = parseInt(values[handle], 10);

      actionMetronome('interval', val);
    }, 100));

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextState.interval, this.state.interval)
  //
  //   return !isEqual(nextProps, this.props);
  // }

  componentDidUpdate() {

    if (this.state.status) {
      this._playWithInterval();
    } else {
      this._stopPlaying();
    }
  }

  render() {
    let btnClass = 'metronome__btn fa';

    if (this.state.status) {
      btnClass = classNames(btnClass, 'fa-pause');
    } else {
      btnClass = classNames(btnClass, 'fa-play');
    }

    return (
      <div className='metronome'>
        <a href className={ btnClass } onClick={ this._onClickHandler.bind(this) }></a>

        <div className="metronome__range-wrap">
          <h5 className="metronome__title">Volume</h5>
          <div className="metronome__range" ref={(c) => this._metronomeRange = c }></div>
        </div>
      </div>
    )
  }

  _onClickHandler(e) {
    e.preventDefault();

    this.setState({
      status: !this.state.status
    });
  }

  _playFromBegin() {
    let audio = this.audio;

    audio.pause();

    setTimeout(() => {
      audio.currentTime = 0;
      audio.play();
    }, 100);

  }

  _playWithInterval() {
    let self = this;
    const {interval} = this.props;

    let loop = () => {
      self.timeout = setTimeout(function () {
        self._playFromBegin();

        loop();

      }, interval);
    }

    loop();
  }

  _stopPlaying() {
    clearTimeout(this.timeout);
    
    this.audio.pause();
  }

}

export default Metronome