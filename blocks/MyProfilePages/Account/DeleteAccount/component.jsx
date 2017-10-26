import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './delete-account.module.styl';

const DeleteAccount = () => (
  <div>
    <h3 styleName="title">Change password</h3>

    <button className="button">Delete account</button>
  </div>
);

export default CSSModules(DeleteAccount, styles);
