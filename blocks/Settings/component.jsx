import React, { Component } from 'react';
import { Redirect, Route, Link, NavLink } from 'react-router-dom';

// import store from 'Redux/store';
import LearningMode from '../LearningMode/container.jsx';
import TextMode from '../TextMode/component.jsx';
import Keyboard from '../Keyboard/container.jsx';

class Settings extends Component {
  onLearningModeEnter = () => {
    this.a = 1;

    // const path = `/settings/learning-mode/${store.getState().getIn(['learningMode', 'mode'])}`;
    //
    // replace({
    //   pathname: path,
    // });
  };

  render() {
    const {
      mode,
      match: {
        url,
      },
    } = this.props;

    return (
      <div className="settings">

        <nav className="settings__nav">
          <div className="settings__nav-in">
            <Link className="settings__home fa fa-keyboard-o" to="/" />
            <NavLink className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/learning-mode">
              Learning mode
            </NavLink>
            <NavLink className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/text-mode">
              Text mode
            </NavLink>
            <NavLink className="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/keyboard">
              Keyboard Layout
            </NavLink>
          </div>
        </nav>

        <Redirect from={url} to={`${url}/${mode}-mode`} />

        <Route path={`${url}/learning-mode`} component={LearningMode} />

        <Route path={`${url}/text-mode`} component={TextMode} />

        <Route path={`${url}/keyboard`} component={Keyboard} />

      </div>
    );
  }
}

export default Settings;
