import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './footer.module.styl';

const Footer = () => (
  <footer styleName="footer">
    © 2016 Touch to type
    <br />
    <a href="mailto:info@touchtotype.com">info@touchtotype.com</a>
    <br />
    <Link to="/help">Help</Link>
  </footer>
);

export default CSSModules(Footer, styles);
