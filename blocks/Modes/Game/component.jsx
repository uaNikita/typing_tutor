import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './texts.module.styl';

class Block extends Component {
  render() {
    return (
      'game is here'
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
