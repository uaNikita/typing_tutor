import React from 'react';
import { Link } from 'react-router-dom';

import styles from './user-menu.module.styl';

const UserMenu = ({ email, name, logout }) => {
  let content = [
    <Link key="log-in" to={{ pathname: '/auth/login', state: { modal: true } }}>Log In</Link>,
    '\u00A0or\u00A0',
    <Link key="sign-up" to={{ pathname: '/auth/registration', state: { modal: true } }}>Sign Up</Link>,
  ];

  if (email) {
    const nickname = name || email;

    content = [
      <span key="nickname" className={styles.avatar}>{nickname[0]}</span>,
      <button key="log-out" className={`${styles['log-out']} fa fa-sign-out`} onClick={logout} />,
    ];
  }

  return content;
};


export default UserMenu;
