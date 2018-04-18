import React, { Fragment } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
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

const Block = props => {
  const {
    lesson,
    match: {
      url,
    },
  } = props;

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
    <Fragment>
      <ModeButton to="learning" />

      <LearningView lesson={lesson} />

      <div styleName="modes">
        <div styleName="menu">
          <h4 styleName="title">Keys set</h4>
          {links}
        </div>

        <div styleName="content">
          <Switch>
            <Redirect exact from={url} to={`${url}/fingers`} />
            <Route path={`${url}/fingers`} component={LearningFingers} />
            <Route path={`${url}/free`} component={LearningFree} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default CSSModules(Block, styles);
