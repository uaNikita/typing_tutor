import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SyllableMode from './SyllableMode/container';
import TextMode from './TextMode/component';

const Modes = ({ match: { url } }) => (
  <Switch>
    <Redirect exact from={url} to={`${url}/syllable`} />
    <Route path={`${url}/syllable`} component={SyllableMode} />
    <Route path={`${url}/text`} component={TextMode} />
    <Redirect to="/404" />
  </Switch>
);

export default Modes;
