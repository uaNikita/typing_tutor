import React from 'react';

import LearningView from 'Blocks/LearningView/component.jsx';
import Statistic from '../Statistic/component.jsx';

const LearningArea = ({ successTypes, speed, errorTypes, lessonTyped: typed, lessonRest: rest }) => ([
  <Statistic key="statistic" hits={successTypes} speed={speed} errors={errorTypes} />,

  <LearningView key="learningview" lesson={{ typed, rest }} />,
]);

export default LearningArea;
