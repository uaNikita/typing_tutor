import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './footer.module.styl';

class Block extends PureComponent {
  year = new Date().getFullYear()

  render() {
    return (
      <footer styleName="footer">
        © 2016–{this.year} Touch to type
        <br />
        <a href="mailto:info@touchtotype.com">info@touchtotype.com</a>
        <br />
        <Link to="/help">Help</Link>
      </footer>
    );
  }
}

export default CSSModules(Block, styles);
