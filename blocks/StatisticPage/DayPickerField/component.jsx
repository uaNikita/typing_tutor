import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Field } from 'redux-form/immutable';
import { CSSTransition } from 'react-transition-group';
import DayPicker from 'react-day-picker';
import format from 'date-fns/format';

import styles from './day-picker-field.module.styl';

class Block extends Component {
  state = {
    show: false,
  };

  handleFocus = () => (
    this.setState({
      show: true,
    })
  );

  handleBlur = () => (
    this.setState({
      show: false,
    })
  );

  handleDayClick = (day) => {
    const {
      props: {
        onChange,
      },
    } = this;

    onChange({
      original: day,
      formatted: format(day, 'DD/MM/YYYY'),
    });
  };

  render() {
    const {
      props,
      state: {
        show,
      },
    } = this;

    return (
      <div styleName="daypicker">
        <Field
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        <CSSTransition
          in={show}
          timeout={300}
          classNames={{
            enter: styles.enter,
            enterActive: styles['enter-active'],
            exit: styles.exit,
            exitActive: styles['exit-active'],
          }}
          unmountOnExit
        >
          <div styleName="overlay">
            <div className="DayPickerInput-Overlay">
              <DayPicker
                onDayClick={this.handleDayClick}
              />
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
