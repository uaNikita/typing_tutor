import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LearningMode from './LearningMode/container';
import TextMode from './TextMode/component';

const Modes = ({ match: { url } }) => (
  <Switch>
    <Redirect exact from={url} to={`${url}/syllable`} />
    <Route path={`${url}/syllable`} component={LearningMode} />
    <Route path={`${url}/text`} component={TextMode} />
    <Redirect to="/404" />
  </Switch>
);

export default Modes;
