import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Index from './Index/container';
import Texts from './Texts/container';
import Text from './Text/container';
import Add from './Add/container';

const TextMode = ({ match: { url } }) => (
  <Switch>
    <Route exact path={url} component={Index} />
    <Route path={`${url}/list`} component={Texts} />
    <Route path={`${url}/add`} component={Add} />
    <Route path={`${url}/:textId(\\d+)`} component={Text} />
    <Redirect to="/404" />
  </Switch>
);

export default TextMode;
