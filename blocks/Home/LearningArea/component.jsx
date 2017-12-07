import React from 'react';

import LearningView from 'Blocks/LearningView/component.jsx';
import Statistic from '../Statistic/component.jsx';

const LearningArea = ({ successTypes, speed, errorTypes, typed, last }) => ([
  <Statistic key="statistic" hits={successTypes} speed={speed} errors={errorTypes} />,

  <LearningView key="learningview" lesson={{ typed, last }} />,
]);

export default LearningArea;
