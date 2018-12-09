import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './help.module.styl';

const Block = () => (
  /* eslint-disable max-len */
  <section styleName="help">
    <h1>Help</h1>
    <em>Touch to type</em> is app which help you to typing text faster with smaller amount of typos. You can use it without registration, but in this case your progress will be kept in your browser. So if for example you
    move to another browser or clear your browser data you lose all your statistic and choosed options. If you want to prevent this, please create your account here <Link to="/authorization/sign-up" />

    <h2>Modes</h2>
    <p>The app has two modes:</p>

    <ul>
      <li>
        <strong>Syllable</strong>. Where you can train various most common letter combinations. The app scans Wikipedia searchs on the most frequently encountered combinations of letters and on their basis generates a string for training. This mode has two different submodes:
        <ul>
          <li>
            <em>Fingers</em>. Where you can choose the length of characters set and width of the typing words.
          </li>
          <li>
            <em>Free</em>. Where you can specify which characters you want to train and set width of the typing words.
          </li>
        </ul>
      </li>
      <li>
        <p><strong>Text</strong>. In this mode you can use already existed texts or add you own one.</p>
      </li>
    </ul>

    <h2>Statistic</h2>
    <p>App start to save statitic after one minute from start typing of any of modes.</p>

    <p>Your can find your statistic on a separate <Link to="/statistic">page</Link>.</p>

    <br />
    Right now <em>Touch to type</em> is free app. If you have question please send it to <a href="mailto:info@touchtotype.com">info@touchtotype.com </a>.
  </section>
  /* eslint-enable max-len */
);

export default CSSModules(Block, styles);
