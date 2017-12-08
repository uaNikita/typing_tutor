import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import LearningView from 'Blocks/LearningView/component.jsx';
import ModeButton from '../ModeButton/container';
import LearningFingers from './LearningFingers/container';
import LearningFree from './LearningFree/container';

import styles from './learning-mode.module.styl';

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

const LearningMode = props => {
  const {
    lesson,
    learningMode,
    match: {
      url,
    },
  } = props;

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
    <div>
      <ModeButton to="learning" />

      <LearningView lesson={lesson} />

      <div styleName="modes">
        <div styleName="menu">
          <h4 styleName="title">Keys set</h4>
          {links}
        </div>

        <div styleName="content">
          <Mode />
        </div>
      </div>
    </div>
  );
};

export default CSSModules(LearningMode, styles);
