import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Breadcrumbs from 'Blocks/Breadcrumbs/component';
import Texts from './Texts/container';
import Text from './Text/container';
import Add from './Add/container';
import Edit from './Edit/container';

const TextMode = ({ match: { url } }) => (
  <Fragment>
    <Route render={props => <Breadcrumbs {...props} start="text" />} />
    <Switch>
      <Route exact path={url} component={Texts} />
      <Route exact path={`${url}/add`} component={Add} />
      <Route exact path={`${url}/edit`} component={Edit} />
      <Route path={`${url}/:\\d+`} component={Text} />
      <Redirect to="/404" />
    </Switch>
  </Fragment>
);

export default TextMode;
