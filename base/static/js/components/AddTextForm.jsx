import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'

import _ from 'lodash';
import classNames from 'classNames';

const specisalCharacters = [
   '\\s', '!', '@', '#', '\\$', '%', '\\^', '&', '\\*', '\\(', '\\)', '_',
   '\\+', '-', '=', ',', '\\.', '\\?', '/', ';', ':', '"', "'", '\\\\', '\\|',
   '\\[', '\\]', '{', '}'
];

const enCharacters = ['\\w'];

const ruCharacters = ['а-я'];

const allCharacters = _.concat(specisalCharacters, enCharacters, ruCharacters);

const getWrongCharsError = (text) => {
   let re = new RegExp('[^' + allCharacters.join('') + ']', 'ig');

   let result = '';

   let errorCharsResult = text.match(re);

   if (errorCharsResult) {
      errorCharsResult = _.uniq(errorCharsResult);

      result = 'Contains invalid character';

      if (errorCharsResult.length > 1) {
         result += 's';
      }

      result += ' - ' + errorCharsResult.join(', ');
   }

   return result;
}

const validate = values => {

   let errors = {};

   if (!values.title) {
      errors.title = 'Title required';
   } else {

      let error = getWrongCharsError(values.title);

      if (error) {
         errors.title = error;
      }

   }

   if (!values.text) {
      errors.text = 'Text required';
   } else {

      let error = getWrongCharsError(values.text);

      if (error) {
         errors.text = error;
      }

   }

   return errors;
}

class RenderField extends Component {

   render() {

      const {
              input,
              placeholder,
              type,
              classNameCtrl,
              meta: {
                touched,
                error,
                warning
              }
            } = this.props

      let notification;

      if (touched) {

         if (error) {
            notification = error;
         }
         else if (warning) {
            notification = warning;
         }

         if (notification) {
            notification = <p className="error">{ notification }</p>
         }

      }

      let ctrl;

      if (type === 'textarea') {
         ctrl = <textarea
           {...input}
           className={classNames('ctrl__el', classNameCtrl)}
           placeholder={placeholder}
           type={type}
         />
      } else {
         ctrl = <input
           {...input}
           className={classNames('ctrl__el', classNameCtrl)}
           placeholder={placeholder}
           type={type}
         />
      }

      return (
        <div className='ctrl'>
           {ctrl}
           {notification}
        </div>
      )
   }

}

const AddTextForm = props => {

   const {handleSubmit} = props;

   return (
     <form className='add-text-form' onSubmit={handleSubmit}>

        <Field
          name='title'
          type='text'
          placeholder='Title'
          component={RenderField}
        />

        <Field
          name='text'
          type='textarea'
          placeholder='Text'
          classNameCtrl='add-text-form__text'
          component={RenderField}
        />

        <button type="submit" className='button add-text-form__add' title='Add text'>Add</button>
     </form>
   )
};

export default reduxForm({
   form: 'forgot-password',
   validate
})(AddTextForm)
