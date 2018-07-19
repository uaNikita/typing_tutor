import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Breadcrumbs from 'Blocks/Breadcrumbs/component';
import Texts from './Texts/container';
import Text from './Text/component';
import Add from './Add/container';

const TextMode = ({ match: { url } }) => (
  <Fragment>
    <Route render={props => <Breadcrumbs {...props} start="text" />} />
    <Switch>
      <Route exact path={url} component={Texts} />
      <Route exact path={`${url}/add`} component={Add} />
      <Route path={`${url}/:textId(\\d+)`} component={Text} />
      <Redirect to="/404" />
    </Switch>
  </Fragment>
);

export default TextMode;
