import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './help.module.styl';

const Block = () => (
  /* eslint-disable react/jsx-one-expression-per-line, max-len */
  <section styleName="help">
    <h1>Help</h1>
    <em>Touch to type</em> is app which help you to typing text faster with smaller amount of typos. You can use ts without registration, but in this case your progress will be kept in your browser. So if for example you move to another browser or clear your browser data you lose all your statistic. If you want to prevent this, please create your account here <Link to="/authorization/sign-up" />

    <h2>Modes</h2>
    The app has two modes.
    <p><strong>Text</strong>. Text mode description</p>
    <p><strong>Learning</strong>. Which has two different submodes for learning mode:</p>
    <ul>
      <li>
        <em>Fingers</em>. Where you can choose the length of characters set and width of the typing words.
      </li>
      <li>
        <em>Free</em>. Where you can specify which characters you want to train and set width of the typing words.
      </li>
    </ul>

    Right now <em>Touch to type</em> is free app. If you have question please send it to <a href="mailto:info@touchtotype.com">info@touchtotype.com </a>.
  </section>
  /* eslint-enable react/jsx-one-expression-per-line, max-len */
);

export default CSSModules(Block, styles);
