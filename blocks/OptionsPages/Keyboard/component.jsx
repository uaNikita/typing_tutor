import React, { Component, Fragment } from 'react';
import keyboards from 'Constants/keyboards/index';

import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component.jsx';

import Key from 'Blocks/Key/component.jsx';

import styles from './keyboard.module.styl';

class Keyboard extends Component {
  handleOnChange = e => {
    const {
      props: {
        setKeyboard,
      },
    } = this;

    setKeyboard(e.target.value);
  };

  render() {
    const {
      props: {
        keys,
      },
    } = this;

    const keyNodes = keys.map(obj => {
      const keyProps = {
        className: 'keyboard__key',
        'data-key': obj.id,
      };

      return (
        <Key
          key={obj.id}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
          {...keyProps}
        />
      );
    });

    return (
      <Fragment>
        <Field
          className={styles.field}
          onChange={this.handleOnChange}
          name="email"
          component={RenderField}
          type="select"
          label="Layout">
          {keyboards.map(({ name: kbName }) => (
            <option key={kbName} value={kbName}>
              {kbName}
            </option>
          ))}
        </Field>

        <Field name="email" component={RenderField} type="email" label="Email" />

        <div className="keyboard">
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'keyboard-layout',
})(Keyboard);
