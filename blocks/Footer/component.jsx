import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './footer.module.styl';

const Footer = () => (
  <footer styleName="footer">
    <p><a styleName="footer__link" href="">Help</a></p>

    <p><a styleName="footer__link" href="">info@touchtotype.com</a></p>

    <p>© 2016 Touch to type</p>
  </footer>
);

export default CSSModules(Footer, styles);
