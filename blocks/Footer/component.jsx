import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './footer.module.styl';

const Footer = () => (
  <footer styleName="footer">
    <p>
      © 2016 Touch to type
      <br />
      <a styleName="footer__link" href="">info@touchtotype.com</a>
      <br />
      <a styleName="footer__link" href="">Help</a>
    </p>
  </footer>
);

export default CSSModules(Footer, styles);
