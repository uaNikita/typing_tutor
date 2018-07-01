import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import RenderField from 'Blocks/RenderField/component';

import { validateField } from 'Utils/validation';

class Block extends Component {
  handleSubmit = (values) => {
    const {
      props: {
        setSettings,
      },
    } = this;

    const settings = values.toJS();

    return setSettings(settings)
      .then((res) => {
        if (res.data && res.data.errors) {
          throw new SubmissionError(res.data.errors);
        }
      });
  };

  render() {
    const {
      props: {
        handleSubmit,
      },
    } = this;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="bio"
          onBlur={handleSubmit(this.handleSubmit)}
          component={RenderField}
          type="textarea"
          label="Bio"
          loader
        />
      </form>
    );
  }
}

const validate = values => ({
  ...validateField('name', values.get('name')),
});

export default reduxForm({
  form: 'bio',
  validate,
})(Block);
