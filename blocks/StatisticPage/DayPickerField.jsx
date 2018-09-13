import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Field } from 'redux-form/immutable';
import classNames from 'classnames';

import DayPicker from 'react-day-picker';

import styles from './statistic.module.styl';

class Block extends Component {
  state = {
    show: false,
  };

  handleFocus = () => {
    console.log('handleFocus');
    this.setState({
      show: true,
    });
  };

  handleDayClick = (...args) => {
    console.log('handleDayClick', args);

    this.setState({
      show: false,
    });
  };

  render() {
    const {
      props,
      state: {
        show,
      },
    } = this;

    const dayPickerOverlayStyleName = classNames(
      'overlay',
      {
        show,
      },
    );

    return (
      <div styleName="daypicker">
        <Field
          {...props}
          onFocus={this.handleFocus}
        />

        <div className="DayPickerInput-Overlay" styleName={dayPickerOverlayStyleName}>
          <DayPicker onDayClick={this.handleDayClick} />
        </div>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
