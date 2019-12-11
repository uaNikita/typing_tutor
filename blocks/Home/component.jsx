import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Header from 'Blocks/Header/container';

import styles from './home.module.styl';

const Block = () => (
  <>
    <Header />

    <div styleName="activities">
      <Link styleName="activity" to="/syllable">Syllable</Link>
      <Link styleName="activity" to="/text">Text</Link>
      <Link styleName="activity" to="/game">Game</Link>
      <Link styleName="activity" to="/race">Race</Link>
    </div>
  </>
);

export default CSSModules(Block, styles);
