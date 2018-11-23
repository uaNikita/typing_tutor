import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Field } from 'redux-form/immutable';
import { CSSTransition } from 'react-transition-group';
import DayPicker from 'react-day-picker';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { closestEl } from 'Utils';

import RenderField from 'Blocks/RenderField/component';

import styles from './day-picker-field.module.styl';

class Block extends Component {
  state = {
    day: undefined,
    show: false,
    error: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.closeIfNeeded);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeIfNeeded);
  }

  closeIfNeeded = (e) => {
    const {
      props: {
        name,
      },
    } = this;

    if (!closestEl(e.target, `.daypicker_${name}`)) {
      this.setState({
        show: false,
      });
    }
  };

  handleFocus = () => (
    this.setState({
      show: true,
    })
  );

  handleDayClick = (selectedDay) => {
    const {
      props: {
        name,
        change,
        onChange,
      },
    } = this;

    const day = dayjs(selectedDay).startOf('day');

    change(name, dayjs(day).format('YYYY-MM-DD'));

    onChange(day);

    this.setState({
      show: false,
      day,
    });
  };

  handleChange = (e, value) => {
    const {
      props: {
        onChange,
      },
    } = this;

    const day = new Date(value);

    onChange(day);

    this.setState({ day });
  };

  handleUpdate = (input, meta) => {
    const error = meta.submitFailed || (meta.error && input.value && meta.touched);

    this.setState({
      error,
    });
  }

  render() {
    const {
      props,
      state: {
        day,
        show,
        error,
      },
    } = this;

    const overlayStyleName = classNames('overlay', {
      'overlay_input-error': error,
    });

    return (
      <div className={`daypicker_${props.name}`} styleName="daypicker">
        <Field
          {...props}
          component={RenderField}
          placeholder="YYYY-MM-DD"
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onUpdate={this.handleUpdate}
          normalize={(value) => {
            let formattedDate = value.replace(/\D/g, '');

            if (formattedDate.length > 4 && formattedDate.length <= 6) {
              formattedDate = `${formattedDate.slice(0, 4)}-${formattedDate.slice(4)}`;
            }
            else if (formattedDate.length > 6) {
              formattedDate = `${formattedDate.slice(0, 4)}-${formattedDate.slice(4, 6)}-${formattedDate.slice(6, 8)}`;
            }

            return formattedDate;
          }}
        />

        <CSSTransition
          in={show}
          timeout={10000}
          classNames={{
            enter: styles.enter,
            enterActive: styles['enter-active'],
            exit: styles.exit,
            exitActive: styles['exit-active'],
          }}
          unmountOnExit
        >
          <div styleName={overlayStyleName}>
            <div className="DayPickerInput-Overlay">
              <DayPicker
                selectedDays={day}
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
