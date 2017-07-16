import React, { Component } from 'react';
import classNames from 'classnames';

class RenderPasswordField extends Component {
  componentDidUpdate(prevProps) {
    const currentPassword = this.props.generatedPassword;
    const prevPassword = prevProps.generatedPassword;

    if (currentPassword && prevPassword === '') {
      this.props.input.onChange(currentPassword);
    }
  }

  onChange = e => {
    this.props.input.onChange(e);

    if (e.isTrusted) {
      this.props.onPasswordChange(e);
    }
  }

  render() {
    const {
      input,
      label,
      type,
      meta: {
        asyncValidating,
        touched,
        error,
      },
    } = this.props;

    let rowClass = 'auth__row';

    if (asyncValidating) {
      rowClass = classNames(rowClass, 'async-validating');
    }

    return (
      <div className={rowClass}>
        {touched && error && <p className="error">{error}</p>}
        <input
          className="auth__control"
          {...input}
          type={type}
          placeholder={label}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default RenderPasswordField;
