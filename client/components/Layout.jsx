import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import classNames from 'classNames';

import Footer from './Footer.jsx';
import ModalFrame from '../containers/ModalFrame.jsx';
import Home from '../containers/Home.jsx';
import Settings from '../containers/Settings.jsx';



class Layout extends Component {

   componentDidUpdate() {
      let $body = $('body');
      let bodyModalClass = 'modal__open';

      if ($body.hasClass(bodyModalClass)) {
         if (!this.props.modalName) {
            $body.removeClass(bodyModalClass);
         }
      } else {
         if (this.props.modalName) {
            $body.addClass(bodyModalClass);
         }
      }
   }

   render() {
      let layoutContentClass = 'layout__content';

      if (this.props.modalName) {
         layoutContentClass = classNames(layoutContentClass, 'modal__open-content');
      }

      return (
         <div className="layout">
            <div className={layoutContentClass}>
               <Route exact path="/" component={ Home } />

               <Route path="/settings" component={ Settings } />

               <Footer />
            </div>

            <ModalFrame />
         </div>
      );
   }
}

export default Layout;