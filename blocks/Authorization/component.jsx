import React, { Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Logo from 'Blocks/Logo/component.jsx';
import SignOut from './SignOut/container';
import RestoreAccess from './RestoreAccess/container';
import SignIn from './SignIn/container';
import SignUp from './SignUp/container';

import styles from './authorization.module.styl';
import './auth.styl';

const Block = ({ match: { url } }) => (
  <Fragment>
    <div styleName="header">
      <Logo />
    </div>

    <Switch>
      <Redirect exact from={url} to={`${url}/sign-in`} />
      <Route path={`${url}/sign-in`} component={SignIn} />
      <Route path={`${url}/sign-up`} component={SignUp} />
      <Route path={`${url}/sign-out`} component={SignOut} />
      <Route path={`${url}/restore-access`} component={RestoreAccess} />
      <Redirect to="/404" />
    </Switch>
  </Fragment>
);

export default CSSModules(Block, styles);
