import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component';
import Button from 'Blocks/Button/component';
import { validateField } from 'Utils/validation';

import styles from './edit-text.module.styl';

class Block extends Component {
  handleSubmit = values => {
    const {
      props: {
        id,
        updateText,
        history: {
          push,
        },
      },
    } = this;

    updateText(id, values.toJS());

    push('/mode/text');
  };

  render() {
    const {
      props: {
        handleSubmit,
        invalid,
        submitting,
        id,
        selectedId,
      },
    } = this;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="text"
          type="textarea"
          placeholder="Text"
          styleName="text"
          component={RenderField}
        />

        <div styleName="actions">
          <Button type="submit" className="button" disabled={invalid} isLoader={submitting}>Save</Button>

          {id !== selectedId && (
            <>
              {/* eslint-disable-next-line */}
              <label styleName="select" htmlFor="select">
                <Field
                  id="select"
                  styleName="select-input"
                  name="select"
                  component="input"
                  type="checkbox"
                />
                and select
              </label>
            </>
          )}
        </div>
      </form>
    );
  }
}

const validate = values => ({
  ...validateField('text', values.get('text')),
});

export default reduxForm({
  form: 'edit-text',
  validate,
})(CSSModules(Block, styles, { allowMultiple: true }));
