import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import LearningFingers from './LearningFingers/container';
import LearningFree from './LearningFree/container';
import Switcher from '../Switcher.jsx';

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
  onSwitcherChange = () => {
    this.props.setMainMode('learning');
  };

  render() {
    const {
      lesson,
      learningMode,
      mode,
      match: {
        url,
      },
    } = this.props;

    const lessonKeys = lesson.split('').map((char, i) => ({ id: i, char })).map(({ id, char }) => {
      let charEl = char;

      if (char === ' ') {
        charEl = <span key={id} className="learningarea__space">␣</span>;
      }

      return charEl;
    });

    const switcherProps = {
      label: {
        title: 'Learning mode on',
      },
      input: {
        checked: true,
        readOnly: true,
      },
    };

    if (mode !== 'learning') {
      switcherProps.label.title = 'Learning mode off';

      switcherProps.input = {
        ...switcherProps.input,
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
        <Switcher {...switcherProps} />

        <div className="learningarea">
          {lessonKeys}
        </div>

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
