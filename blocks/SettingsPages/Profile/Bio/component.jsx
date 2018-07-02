import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import _ from 'lodash';

import RenderField from 'Blocks/RenderField/component';

import { validateField } from 'Utils/validation';

class Block extends Component {
  handleSubmit = (values) => {
    const {
      props: {
        setSettings,
        initialValues,
      },
    } = this;

    const settings = values.toJS();

    settings.bio = _.trim(settings.bio);

    let result = false;

    if (initialValues.get('bio') !== settings.bio) {
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
