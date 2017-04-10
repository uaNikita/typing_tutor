import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import Textarea from '../containers/Textarea.jsx';
import Learningarea from '../containers/Learningarea.jsx';
import Keypad from '../containers/Keypad.jsx';
import Metronome from '../containers/Metronome.jsx';

const $document = $(document);

class Home extends Component {

   constructor(props) {
      super(props);

      const {
         typeChar
      } = this.props;


      this.keyPressHandler = e => {

         if (e.which !== 32) {
            typeChar(String.fromCharCode(e.which));
         }

      };

      this.keyDownHandler = e => {

         if (e.which == 32) {
            e.preventDefault();

            typeChar(String.fromCharCode(e.which));
         }

      };

   }


   componentDidMount() {

      $document.on('keydown', this.keyDownHandler);

      $document.on('keypress', this.keyPressHandler);

      this.props.updateStartVariables();

   }

   componentWillUnmount() {

      $document.off('keydown', this.keyDownHandler);

      $document.off('keypress', this.keyPressHandler);

      this.props.refreshCurrentLesson();

   }

   render() {
      let area;

      const {
         successTypes,
         errorTypes,
         speed,
         mode
      } = this.props;

      switch (mode) {
         case 'text':
            area = <Textarea />;
            break;
         case 'learning':
            area = <Learningarea />;
            break;

      }

      return (
         <div className="home">
            <div className="home__head">
               <Link className="home__settings fa fa-bars" to="/settings" />

               <div className="home__buttons">
                  <Metronome />
                  <div className="home__auth">
                     <a className="home__auth-link" href onClick={this._onLogInClick.bind(this)}>Log In</a>
                     <span className="home__auth-or">or</span>
                     <a className="home__auth-link" href onClick={this._onSignUpClick.bind(this)}>Sign Up</a>
                  </div>
               </div>

            </div>

            <div className="home__typing-info">
               <p className="num-chars">
                  <i className="fa fa-file-text-o num-chars__icon"></i>
                  {successTypes}
               </p>

               <p className="speed">
                  <i className="fa fa-tachometer speed__icon"></i>
                  {speed} зн/мин
               </p>

               <p className="error-key">
                  <i className="fa fa-minus-square-o error-key__icon"></i>
                  {errorTypes}
               </p>
            </div>

            {area}

            <Keypad />
         </div>
      );
   }


   _onLogInClick(e) {
      e.preventDefault();

      this.props.openModal('Login');
   }

   _onSignUpClick(e) {
      e.preventDefault();

      this.props.openModal('Registration');
   }
}

export default Home;

