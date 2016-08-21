import React, {Component} from 'react'
import Footer from './Footer.jsx';
import ModalFrame from '../containers/ModalFrame.jsx';
import classNames from 'classNames';

class Layout extends Component {
  render() {
    let layoutContentClass = 'layout__content';

    if (this.props.modalName) {
      layoutContentClass = classNames(layoutContentClass, 'modal__open');
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