import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './Index/container';
import Settings from './Settings/component';

const Block = ({ match: { url } }) => (
  <Switch>
    <Route exact from={url} component={Index} />
    <Route path={url} component={Settings} />
  </Switch>
);

export default Block;
