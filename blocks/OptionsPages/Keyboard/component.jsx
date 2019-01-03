import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component';
import Key from 'Blocks/Key/component';

import { keyboards } from 'Constants/languages';

import styles from './keyboard.module.styl';

class Block extends Component {
  keyboardsNames = _.map(keyboards, ({ name }) => name)

  handleOnChange = (e) => {
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

    const keyNodes = keys.map((obj) => {
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
          styleName="field"
          onChange={this.handleOnChange}
          name="keyboard"
          component={RenderField}
          type="select"
          label="Layout"
        >
          {this.keyboardsNames.map(name => (
            <option key={name} value={name}>
              {_.lowerCase(name)}
            </option>
          ))}
        </Field>

        <div className="keyboard">
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'keyboard-layout',
})(CSSModules(Block, styles));
