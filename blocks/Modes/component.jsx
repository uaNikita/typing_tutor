import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Syllable from './Syllable/container';
import Text from './Text/component';
import Game from './Game/container';

const Modes = ({ match: { url } }) => (
  <Switch>
    <Redirect exact from={url} to={`${url}/syllable`} />
    <Route path={`${url}/syllable`} component={Syllable} />
    <Route path={`${url}/text`} component={Text} />
    <Route path={`${url}/game`} component={Game} />
    <Redirect to="/404" />
  </Switch>
);

export default Modes;
