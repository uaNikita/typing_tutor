import React from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form/immutable';

import _ from 'lodash';
import classNames from 'classnames';

const specisalCharacters = [
  '\\s', '!', '@', '#', '\\$', '%', '\\^', '&', '\\*', '\\(', '\\)', '_',
  '\\+', '-', '=', ',', '\\.', '\\?', '/', ';', ':', '"', '\'', '\\\\', '\\|',
  '\\[', '\\]', '{', '}',
];

const enCharacters = ['\\w'];

const ruCharacters = ['а-я'];

const allCharacters = _.concat(specisalCharacters, enCharacters, ruCharacters);

const getWrongCharsError = (text) => {
  const re = new RegExp(`[^${allCharacters.join('')}]`, 'ig');

  let result = '';

  let errorCharsResult = text.match(re);

  if (errorCharsResult) {
    errorCharsResult = _.uniq(errorCharsResult);

    result = 'Contains invalid character';

    if (errorCharsResult.length > 1) {
      result += 's';
    }

    result += ` - ${errorCharsResult.join(', ')}`;
  }

  return result;
};

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title required';
  }
  else {
    const error = getWrongCharsError(values.title);

    if (error) {
      errors.title = error;
    }
  }

  if (!values.text) {
    errors.text = 'Text required';
  }
  else {
    const error = getWrongCharsError(values.text);

    if (error) {
      errors.text = error;
    }
  }

  return errors;
};

const RenderField = (props) => {
  const {
    input,
    placeholder,
    type,
    classNameCtrl,
    meta: {
      touched,
      error,
      warning,
    },
  } = props;

  let notification;

  if (touched) {
    if (error) {
      notification = error;
    }
    else if (warning) {
      notification = warning;
    }

    if (notification) {
      notification = <p className="error">{ notification }</p>;
    }
  }

  let ctrl;

  if (type === 'textarea') {
    ctrl = (
      <textarea
        {...input}
        className={classNames('ctrl__el', classNameCtrl)}
        placeholder={placeholder}
        type={type} />
    );
  }
  else {
    ctrl = (
      <input
        {...input}
        className={classNames('ctrl__el', classNameCtrl)}
        placeholder={placeholder}
        type={type} />
    );
  }


  return (
    <div className="ctrl">
      {ctrl}
      {notification}
    </div>
  );
};

const AddTextForm = (props) => {
  const { handleSubmit } = props;

  return (
    <form className="add-text-form" onSubmit={handleSubmit}>

      <Field
        name="title"
        type="text"
        placeholder="Title"
        component={RenderField}
      />

      <Field
        name="text"
        type="textarea"
        placeholder="Text"
        classNameCtrl="add-text-form__text"
        component={RenderField}
      />

      <div className="add-text-form__actions">

        <button type="submit" className="button add-text-form__add" title="Add text">Add text</button>

        <label className="add-text-form__select">
          <Field
            className="add-text-form__select-input"
            name="select-text"
            component="input"
            type="checkbox"
          />
          and select
        </label>

      </div>

    </form>
  );
};

export default reduxForm({
  form: 'add-text',
  validate,
})(AddTextForm);
