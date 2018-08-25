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
        showHiddenChars,
        setHiddenChars,
      },
    } = this;

    setHiddenChars(!showHiddenChars);
  };

  render() {
    const {
      props: {
        showHiddenChars,
      },
    } = this;

    let eyeClassName = 'fa fa-eye';

    if (showHiddenChars) {
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
