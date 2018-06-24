import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import CSSModules from 'react-css-modules';

import GeneralModeButton from '../GeneralModeButton/container';
import LearningFingers from './LearningFingers/container';
import LearningFree from './LearningFree/container';

import './settings-learning.styl';
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

const Block = (props) => {
  const {
    match: {
      url,
    },
  } = props;

  const links = menuLinks.map(({ url: linkUrl, text }) => (
    <NavLink
      key={linkUrl}
      className="submenu-link"
      activeClassName="submenu-link_selected"
      to={url + linkUrl}
    >
      {text}
    </NavLink>
  ));

  return (
    <Fragment>
      <GeneralModeButton toMode="learning" />

      <div styleName="modes">
        <div styleName="menu">
          <h4 styleName="title">
            Sets
          </h4>
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
