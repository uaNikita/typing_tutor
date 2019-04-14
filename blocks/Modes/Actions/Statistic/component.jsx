import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './statistic.module.styl';

const Statistic = ({ hits, typos, startTypingTime }) => {
  let speed = '-';

  if (startTypingTime) {
    const time = (Date.now() - startTypingTime) / (1000 * 60);

    speed = Math.round((hits + typos) / time);

    speed += ' ';
  }

  return (
    <div styleName="typing-info">
      <p title="Hits">
        <i className="fas fa-thumbs-up" styleName="hits" />
        {hits}
      </p>

      <p title="Characters per minute">
        <i className="fas fa-tachometer-alt" styleName="speed" />
        {speed}
        {' '}
        cpm
      </p>

      <p title="Typos">
        <i className="fas fa-thumbs-down" styleName="errors" />
        {typos}
      </p>
    </div>
  );
};

export default CSSModules(Statistic, styles);
