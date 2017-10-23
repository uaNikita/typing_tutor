import React from 'react';
import CSSModules from 'react-css-modules';

import SubMenu from 'Blocks/SubMenu/component.jsx';

import styles from './home.module.styl';

const MyProfile = () => (
  <SubMenu />
);

export default CSSModules(MyProfile, styles);
