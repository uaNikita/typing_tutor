import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Switcher from 'Blocks/Switcher/component.jsx';
import LearningView from 'Blocks/LearningView/component.jsx';
import LearningFingers from './LearningFingers/container';
import LearningFree from './LearningFree/container';

const menuLinks = [
  {
    url: '/fingers',
    text: 'By fingers',
  },
  {
    url: '/free',
    text: 'Free',
  },
];

class LearningMode extends Component {
  onSwitcherChange = () => this.props.setMainMode('learning');

  render() {
    const {
      lesson,
      learningMode,
      mode,
      match: {
        url,
      },
    } = this.props;

    let switcherPropsInput = {
      checked: true,
      readOnly: true,
    };

    if (mode !== 'learning') {
      switcherPropsInput = {
        checked: false,
        readOnly: false,
        onChange: this.onSwitcherChange,
      };
    }

    let Mode;

    switch (learningMode) {
      case 'fingers':
        Mode = LearningFingers;
        break;
      case 'free':
        Mode = LearningFree;
        break;
    }

    const links = menuLinks.map(({ url: linkUrl, text }) => (
      <NavLink
        key={linkUrl}
        className="submenu-link"
        activeClassName="submenu-link_selected"
        to={url + linkUrl}>
        {text}
      </NavLink>
    ));

    return (
      <div className="settings-learning">
        <Switcher {...switcherPropsInput} />

        <LearningView lesson={lesson} />

        <div className="settings-learning__modes">
          <div className="settings-learning__modes-menu">
            <h4 className="settings-learning__modes-menu-title">Keys set</h4>
            {links}
          </div>

          <div className="settings-learning__modes-content">
            <Mode />
          </div>
        </div>
      </div>
    );
  }
}

export default LearningMode;
