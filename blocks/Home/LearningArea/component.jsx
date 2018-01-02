import React from 'react';

import LearningView from 'Blocks/LearningView/component.jsx';

const LearningArea = ({ lessonTyped: typed, lessonRest: rest }) => ([
  <LearningView key="learningview" lesson={{ typed, rest }} />,
]);

export default LearningArea;
