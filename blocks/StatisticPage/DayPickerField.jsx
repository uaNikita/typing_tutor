import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Field } from 'redux-form/immutable';

import DayPicker from 'react-day-picker';

import styles from './statistic.module.styl';

class Block extends Component {
  handleFocus() {
    console.log(111);
  }

  handleDayClick() {
    console.log(987987);
  }

  render() {
    const { props } = this;

    return (
      <div styleName="daypicker">
        <Field
          {...props}
            onFocus={this.handleFocus}
        />

        <div className="DayPickerInput-Overlay" styleName="">
          <DayPicker
            onDayClick={this.handleDayClick}
          />
        </div>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
