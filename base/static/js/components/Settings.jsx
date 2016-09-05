import React, {Component} from 'react';
import {Link} from 'react-router'

class Settings extends Component {

  render() {

    return (
      <div className="settings">

        <nav className="settings__nav">
          <div className="settings__nav-in">
            <Link className="settings__home fa fa-keyboard-o" to="/" />
            <Link className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/learning">
              Learning mode
            </Link>
            <Link className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/text">
              Text mode
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
