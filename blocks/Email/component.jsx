import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';

import styles from './email.module.styl';

class Block extends PureComponent {
  name = 'info'

  domain = 'touchtotype'

  tld = 'com'

  handleClick = () => window.location.assign(`mailto:${this.name}@${this.domain}.${this.tld}`);

  render() {
    return (
      <button
        type="button"
        className="link"
        styleName="email"
        data-name="info"
        data-domain="touchtotype"
        data-tld="com"
        onClick={this.handleClick}
      />
    );
  }
}

export default CSSModules(Block, styles);
