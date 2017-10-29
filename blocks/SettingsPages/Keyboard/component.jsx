import React, { Component } from 'react';
import keyboards from 'Constants/keyboards';

import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component.jsx';

import Key from 'Blocks/Key/component.jsx';

class Keyboard extends Component {
  handleOnChange = e => {
    this.props.setKeyboard(e.target.value);
  }

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
          keyProps={keyProps}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
        />
      );
    });

    return (
      <div className="keyboard-layout">
        <Field
          onChange={this.handleOnChange}
          name="email"
          component={RenderField}
          type="select"
          label="Layout">
          {keyboards.map(({ name: kbName }) => <option key={kbName} value={kbName}>{kbName}</option>)}
        </Field>

        <div className="keyboard">
          {keyNodes}
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'keyboard-layout',
})(Keyboard);
