import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Breadcrumbs from 'Blocks/Breadcrumbs/component';
import Texts from './Texts/container';
import Text from './Text/container';
import AddText from './AddText/container';

const TextMode = ({ match: { url } }) => (
  <Fragment>
    <Route render={props => <Breadcrumbs {...props} start="text" />} />
    <Switch>
      <Route exact path={url} component={Texts} />
      <Route exact path={`${url}/add-text`} component={AddText} />
      <Route path={`${url}/:textId`} component={Text} />
    </Switch>
  </Fragment>
);

export default TextMode;
