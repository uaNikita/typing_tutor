import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Texts from './Texts/container';
import Text from './Text/container';
import AddText from './AddText/container';

const TextMode = ({ match: { url } }) => (
  <Switch>
    <Route key="texts" exact path={url} component={Texts} />
    <Route key="add-text" exact path={`${url}/add-text`} component={AddText} />
    <Route key="text" path={`${url}/:textId`} component={Text} />
  </Switch>
);

export default TextMode;
