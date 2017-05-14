import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import classNames from 'classNames';
import generatePassword from 'password-generator';


const validate = values => {

   let errors = {};

   if (!values.get('email')) {
      errors.email = 'Required';
   }
   if (!values.get('password')) {
      errors.password = 'Required';
   }

   return errors;

};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class RenderField extends Component {

   render() {
      const {
         input,
         label,
         type,
         meta: {
            asyncValidating,
            touched,
            error
         }
      } = this.props;

      let rowClass = 'auth__row';

      if (asyncValidating) {
         rowClass = classNames(rowClass, 'async-validating');
      }

      return (
         <div className={rowClass}>
            {touched && error && <p className="error">{error}</p>}
            <input
               className="auth__control"
               {...input}
               type={type}
               placeholder={label}
            />
         </div>
      );
   }
}

class RenderPasswordField extends Component {

   componentDidUpdate(prevProps) {
      let currentPassword = this.props.generatedPassword;
      let prevPassword = prevProps.generatedPassword;

      if (currentPassword && prevPassword === '') {
         this.props.input.onChange(currentPassword);
      }
   }

   render() {
      const {
         input,
         label,
         type,
         meta: {
            asyncValidating,
            touched,
            error
         }
      } = this.props;

      let rowClass = 'auth__row';

      if (asyncValidating) {
         rowClass = classNames(rowClass, 'async-validating');
      }

      return (
         <div className={rowClass}>
            {touched && error && <p className="error">{error}</p>}
            <input
               className="auth__control"
               {...input}
               type={type}
               placeholder={label}
               onChange={this._onChange.bind(this)}
            />
         </div>
      );
   }

   _onChange(e) {
      this.props.input.onChange(e);

      if (e.isTrusted) {
         this.props.onPasswordChange(e);
      }
   }
}

class RegistrationForm extends Component {

   constructor(props) {
      super(props);

      this.state = {
         password: '',
         createPassword: false
      };
   }

   render() {
      const {
         handleSubmit,
         submitting,
         valid
      } = this.props;


      return (
         <form className="auth__form" onSubmit={ handleSubmit }>
            <Field
               name="email"
               component={RenderField}
               type="email"
               label="Email"
            />

            <Field
               ref="password"
               name="password"
               component={RenderPasswordField}
               type="password"
               label="Password"
               generatedPassword={this.state.password}
               onPasswordChange={this._passwordChange.bind(this)}
            />

            <label className="auth__cp">
               <input
                  className="auth__cp-control"
                  type="checkbox"
                  checked={this.state.createPassword}
                  onChange={this._onCreatePasswordChange.bind(this)} />
               Create a password for me
            </label>

            <button className="button" type="submit" disabled={ !valid || submitting }>Sign Up</button>

            <p className="auth__hint">Already registered? <a className="auth__link1" href onClick={ this._onLoginClick.bind(this) }>Log in now</a></p>
         </form>
      );
   }


   _passwordChange(e) {

      if (this.state.createPassword) {
         this.setState({
            createPassword: false,
            password: ''
         });
      }

   }

   _onCreatePasswordChange() {
      let password = '';

      if (!this.state.createPassword) {
         password = generatePassword(5, false, /[\w\d]/);
      }

      this.setState({
         createPassword: !this.state.createPassword,
         password
      });
   }

   _onLoginClick(e) {
      e.preventDefault();

      this.props.openModal('Login');
   }
}

export default reduxForm({
   form: 'registration',
   validate
   // asyncValidate,
   // asyncBlurFields: ['email']
})(RegistrationForm);
