import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './statistic.module.styl';

const Statistic = ({ hits, speed, errors }) => (
  <div key="typing-info" styleName="typing-info">
    <p>
      <i className="fa fa-file-text-o" styleName="hits" />
      {hits}
    </p>

    <p>
      <i className="fa fa-tachometer" styleName="speed" />
      {speed} зн/мин
    </p>

    <p>
      <i className="fa fa-minus-square-o" styleName="errors" />
      {errors}
    </p>
  </div>
);

export default CSSModules(Statistic, styles);
