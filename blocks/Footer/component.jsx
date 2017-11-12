import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './footer.module.styl';

const Footer = () => (
  <footer styleName="footer">
    <p>
      © 2016 Touch to type
      <br />
      <a styleName="footer__link" href="mailto:info@touchtotype.com">info@touchtotype.com</a>
      <br />
      <Link styleName="footer__link" to="/help">Help</Link>
    </p>
  </footer>
);

export default CSSModules(Footer, styles);
