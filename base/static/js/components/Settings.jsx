import React, {Component} from 'react';
import {Link} from 'react-router'

class Settings extends Component {

  render() {

    return (
      <div className="settings">

        <nav className="settings__nav">
          <div className="settings__nav-in">
            <Link className="settings__home" to="/">
              <i className="fa fa-keyboard-o"></i>
              <span className="text">Keyboard</span>
            </Link>
            <Link className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/mode">
              Learning Mode
            </Link>
            <Link className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/keyboard">
              Keyboard Layout
            </Link>
          </div>
        </nav>

        { this.props.children }
      </div>

    )
  }
}

export default Settings
