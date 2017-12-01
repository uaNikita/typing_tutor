import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './user-menu.module.styl';

const AuthInfo = ({ email, name }) => {
  let content = [
    <Link key="log-in" to={{ pathname: '/sign-in', state: { modal: true } }}>Log In</Link>,
    '\u00A0or\u00A0',
    <Link key="sign-up" to={{ pathname: '/sign-up', state: { modal: true } }}>Sign Up</Link>,
  ];

  if (email) {
    const nickname = name || email;

    content = <span styleName="avatar">{nickname[0]}</span>;
  }

  return <div styleName="auth-info">{content}</div>;
};

export default CSSModules(AuthInfo, styles);
