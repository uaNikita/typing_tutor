import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


import Texts from './Texts/container';
import Text from './Text/container';
import Add from './Add/container';

const TextMode = ({ match: { url } }) => (
  <Switch>
    <Route exact path={url} component={Texts} />
    <Route exact path={`${url}/add`} component={Add} />
    <Route path={`${url}/:textId(\\d+)`} component={Text} />
    <Redirect to="/404" />
  </Switch>
);

export default TextMode;
