import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Syllable from './Syllable/component';
import Text from './Text/component';
import Game from './Game/component';
import Race from './Race/container';

const Block = () => (
  <Switch>
    <Route path="/syllable" component={Syllable} />
    <Route path="/text" component={Text} />
    <Route path="/game" component={Game} />
    <Route path="/race" component={Race} />
    <Redirect to="/404" />
  </Switch>
);

export default Block;
