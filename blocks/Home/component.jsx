import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Header from 'Blocks/Header/container';

import styles from './home.module.styl';

const Block = () => (
  <Fragment>
    <Header />
    <br />
    <br />
    <br />
    <Link to="/syllable">Help</Link>
    <br />
    <br />
    <br />
    <Link to="/text">Text</Link>
    <br />
    <br />
    <br />
    <Link to="/game">Game</Link>
    <br />
    <br />
    <br />
    <Link to="/races">Race</Link>
  </Fragment>
);

export default CSSModules(Block, styles);
