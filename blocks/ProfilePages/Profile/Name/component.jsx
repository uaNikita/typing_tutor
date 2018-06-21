import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import RenderField from 'Blocks/RenderField/component.jsx';

import { validateField } from 'Utils/validation';

class Block extends Component {
  handleSubmit = values => {
    const {
      props: {
        fetchJSON,
        setGlobalMessage,
        reset,
      },
    } = this;

    const body = values.toJS();

    delete body.confirm_new_password;

    return fetchJSON('/profile/change-password', { body })
      .then(res => {
        if (res.ok) {
          setGlobalMessage('Password was changed');

          reset();

          // remove focus from fields
          window.focus();
        }
        else if (res.data.errors) {
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
        <h3>Name</h3>

        <Field
          name="name"
          component={RenderField}
          type="text"
          label="Name" />
      </form>
    );
  }
}

const validate = values => {
  const e = {
    ...validateField('name', values.get('name')),
  }
  console.log('e', e);
  return e;
}

export default reduxForm({
  form: 'name',
  validate,
})(Block);
