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
      case 'text':
        area = <Textarea />
        break
      case 'learning':
        area = <Learningarea />
        break
    }

    return (
      <div className="home">
        <div className="home__auth">
          <a className="home__auth-link" href onClick={this._onLogInClick.bind(this)}>Log In</a>
          <span className="home__auth-or">or</span>
          <a className="home__auth-link" href onClick={this._onSignUpClick.bind(this)}>Sign Up</a>
        </div>

        <Metronome />

        <nav className="home__nav">
          <Link className="home__settings fa fa-bars" to="/settings" />
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


  _onLogInClick(e) {
    e.preventDefault();

    this.props.openModal('Login');
  }

  _onSignUpClick(e) {
    e.preventDefault();

    this.props.openModal('Registration');
  }
}

export default Home

