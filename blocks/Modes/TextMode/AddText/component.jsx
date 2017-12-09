import React, { Component } from 'react';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';
// import _ from 'lodash';

import RenderField from 'Blocks/RenderField/component.jsx';
import { validateField } from 'Utils/validation';

import styles from './add-text.module.styl';


// const specisalCharacters = [
//   '\\s', '!', '@', '#', '\\$', '%', '\\^', '&', '\\*', '\\(', '\\)', '_',
//   '\\+', '-', '=', ',', '\\.', '\\?', '/', ';', ':', '"', '\'', '\\\\', '\\|',
//   '\\[', '\\]', '{', '}',
// ];
//
// const enCharacters = ['\\w'];
//
// const ruCharacters = ['а-я'];
//
// const allCharacters = _.concat(specisalCharacters, enCharacters, ruCharacters);

// const getWrongCharsError = text => {
//   const re = new RegExp(`[^${allCharacters.join('')}]`, 'ig');
//
//   let result = '';
//
//   let errorCharsResult = text.match(re);
//
//   if (errorCharsResult) {
//     errorCharsResult = _.uniq(errorCharsResult);
//
//     result = 'Contains invalid character';
//
//     if (errorCharsResult.length > 1) {
//       result += 's';
//     }
//
//     result += ` - ${errorCharsResult.join(', ')}`;
//   }
//
//   return result;
// };

// const validate = values => {
//   const errors = {};
//
//   if (!values.title) {
//     errors.title = 'Title required';
//   }
//   else {
//     const error = getWrongCharsError(values.title);
//
//     if (error) {
//       errors.title = error;
//     }
//   }
//
//   if (!values.text) {
//     errors.text = 'Text required';
//   }
//   else {
//     const error = getWrongCharsError(values.text);
//
//     if (error) {
//       errors.text = error;
//     }
//   }
//
//   return errors;
// };

class AddText extends Component {
  textFormHandleSubmit = values => {
    const {
      addText,
      selectAddedText,
      history: {
        push,
      },
    } = this.props;

    addText(values.title, values.text);

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
          name="title"
          type="text"
          placeholder="Title"
          component={RenderField}
        />

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
  ...validateField('title', values.get('title')),
  ...validateField('text', values.get('text')),
});

export default reduxForm({
  form: 'add-text',
  validate,
})(CSSModules(AddText, styles, { allowMultiple: true }));

