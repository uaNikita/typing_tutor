import React, {Component} from 'react';
import {Link} from 'react-router'

import Textarea from '../containers/Textarea.jsx';
import Learningarea from '../containers/Learningarea.jsx';
import Keypad from '../containers/Keypad.jsx';
import Metronome from '../containers/Metronome.jsx';

class Home extends Component {
  render() {
    let area;

    const {
            typedChars,
            speed,
            errors,
            mode
          } = this.props

    switch (mode) {
      case 1:
        area = <Textarea />
        break
      case 2:
        area = <Learningarea />
        break
    }
    
    return (
      <div className="home">
        <Metronome />

        <nav className="home__nav">
          <Link className="home__settings" to="/settings">
            <i className="fa fa-bars"></i> Settings
          </Link>
        </nav>

        <div className="home__typing-info">
          <p className="num-chars">
            <i className="fa fa-file-text-o num-chars__icon"></i>
            {typedChars}
          </p>

          <p className="speed">
            <i className="fa fa-tachometer speed__icon"></i>
            {speed} зн/мин
          </p>

          <p className="error-key">
            <i className="fa fa-minus-square-o error-key__icon"></i>
            {errors}
          </p>
        </div>

        {area}

        <Keypad />
      </div>
    )
  }
}

export default Home

