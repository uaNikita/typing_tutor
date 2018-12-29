import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Email from '../Email/component';

import styles from './help.module.styl';

const Block = () => (
  /* eslint-disable max-len */
  <section styleName="help">
    <h1>Help</h1>
    <em>Touch to type</em> is app which help you to typing text faster with smaller amount of typos. You can use it without registration, but in this case your progress will be kept in your browser. So if for example you
    move to another browser or clear your browser data you lose all your statistic and choosed options. If you want to prevent this, please create your account with
    registration <Link to="/authorization/sign-up">page</Link>.

    <h2>Modes</h2>
    <p>The app has two modes:</p>

    <ul>
      <li>
        <strong>Syllable</strong>. Where you can train various most common letter combinations. The app scans Wikipedia searchs on the most frequently encountered combinations of letters and on their basis generates a
        string for training. This mode has two different submodes:
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
        <p><strong>Text</strong>. This mode allow to type free text. You can use already existed texts or add you own one. Maximum amount of texsts is 10.</p>
      </li>
    </ul>

    <h2>Options</h2>
    <p>Here you can change your <i>Keyboard layout</i> if needed.</p>

    <h2>Statistic</h2>
    <p>App starts to save statitic after 10 seconds from start typing of any of modes. You can see your statistic in different charts on the corresponding page.</p>

    <h2>Other</h2>
    Right now <em>Touch to type</em> is free app. Only one person works on it - me. In this case I can lose sight of some user expirience limitations or some critical bugs. I will be very apprisiate if you
    write to my email.

    <p>
      So generaly I want to say:
      <br />
      <em>Found bug? Have a question? Whan to help? Write to <Email /></em>.
    </p>
  </section>
  /* eslint-enable max-len */
);

export default CSSModules(Block, styles);
