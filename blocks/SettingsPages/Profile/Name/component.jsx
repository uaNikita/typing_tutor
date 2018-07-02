import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import RenderField from 'Blocks/RenderField/component';

import { validateField } from 'Utils/validation';
import _ from "lodash";

class Block extends Component {
  handleSubmit = (values) => {
    const {
      props: {
        setSettings,
        initialValues,
      },
    } = this;

    const settings = values.toJS();

    settings.name = _.trim(settings.name);

    let result = false;

    if (initialValues.get('name') !== settings.name) {
      result = setSettings(settings)
        .then((res) => {
          if (res.data && res.data.errors) {
            throw new SubmissionError(res.data.errors);
          }
        });
    }

    return result;
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
          name="name"
          onBlur={handleSubmit(this.handleSubmit)}
          component={RenderField}
          label="Name"
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
  form: 'name',
  validate,
})(Block);
