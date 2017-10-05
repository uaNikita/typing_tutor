import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Loader from '../Loader/component.jsx';

import styles from './verify-page.module.styl';

class Block extends Component {
  componentDidMount() {
    console.log(1);
  }

  render() {
    return (
      <div>
        <Loader />
      </div>
    );
  }
}

export default CSSModules(Block, styles);
