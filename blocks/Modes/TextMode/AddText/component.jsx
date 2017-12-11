import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component.jsx';
import { validateField } from 'Utils/validation';

import styles from './add-text.module.styl';

class AddText extends Component {
  textFormHandleSubmit = values => {
    const {
      addText,
      selectAddedText,
      history: {
        push,
      },
    } = this.props;

    addText(values.toJS().text);

    if (values['select-text']) {
      selectAddedText();
    }

    push('/modes/text');
  };

  render() {
    const {
      props: {
        handleSubmit,
      },
    } = this;

    return (
      <form onSubmit={handleSubmit(this.textFormHandleSubmit)}>
        <Field
          name="text"
          type="textarea"
          placeholder="Text"
          styleName="text"
          component={RenderField}
        />

        <div styleName="actions">
          <button type="submit" className="button" title="Add text">Add text</button>

          <label styleName="select">
            <Field
              styleName="select-input"
              name="select-text"
              component="input"
              type="checkbox"
            />
            and select
          </label>
        </div>
      </form>
    );
  }
}

const validate = values => ({
  ...validateField('text', values.get('text')),
});

export default reduxForm({
  form: 'add-text',
  validate,
})(CSSModules(AddText, styles, { allowMultiple: true }));

