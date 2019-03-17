import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Statistic from './Statistic/container';
import Metronome from './Metronome/container';

import styles from './actions.module.styl';

class Block extends Component {
  handleHiddenChars = () => {
    const {
      props: {
        hiddenChars,
        setHiddenChars,
      },
    } = this;

    setHiddenChars(!hiddenChars);
  };

  render() {
    const {
      props: {
        hiddenChars,
      },
    } = this;

    let eyeClassName = 'fas fa-eye';

    if (hiddenChars) {
      eyeClassName += '-slash';
    }

    return (
      <div styleName="root">
        <Statistic />

        <div styleName="actions">
          <button
            type="button"
            className={eyeClassName}
            styleName="eye"
            onClick={this.handleHiddenChars}
            title="Hidden characters"
          />

          <Metronome />
        </div>
      </div>
    );
  }
}

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
