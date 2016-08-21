import React, {Component} from 'react'
import Footer from './Footer.jsx';
import ModalFrame from '../containers/ModalFrame.jsx';
import $ from 'jquery';
import classNames from 'classNames';

class Layout extends Component {
  componentDidUpdate() {
    let $body = $('body');
    let bodyModalClass = 'modal__open';

    if ($body.hasClass(bodyModalClass)) {
      if (!this.props.modalName) {
        $body.removeClass(bodyModalClass)
      }
    } else {
      if (this.props.modalName) {
        $body.addClass(bodyModalClass)
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
          {this.props.children}
          <Footer />
        </div>
        <ModalFrame />
      </div>
    )
  }
}

export default Layout