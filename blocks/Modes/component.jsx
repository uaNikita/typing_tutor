import React from 'react';
import { Route } from 'react-router-dom';

import LearningMode from './LearningMode/container';
import TextMode from './TextMode/component.jsx';

const Modes = ({ match: { url } }) => ([
  <Route key="learning" path={`${url}/learning`} component={LearningMode} />,
  <Route key="text" path={`${url}/text`} component={TextMode} />,
]);

export default Modes;
