import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './home.module.styl';

class MyProfile extends Component {
  render() {
    return (
      <div styleName="content" ref={el => { this.home = el; }}>
        <div styleName="head">
          <Link styleName="settings" className="fa fa-bars" to="/settings" />

          <div styleName="buttons">
            {email && <Metronome />}
            <UserMenu />
          </div>

        </div>

        <div styleName="typing-info">
          <p className="num-chars">
            <i className="fa fa-file-text-o num-chars__icon" />
            {successTypes}
          </p>

          <p className="speed">
            <i className="fa fa-tachometer speed__icon" />
            {speed} зн/мин
          </p>

          <p className="error-key">
            <i className="fa fa-minus-square-o error-key__icon" />
            {errorTypes}
          </p>
        </div>

        {area}

        <Keypad />
      </div>
    );
  }
}

export default CSSModules(MyProfile, styles);
