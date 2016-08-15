import React, {Component} from 'react'
import Footer from './Footer.jsx';
import ModalFrame from '../containers/ModalFrame.jsx';

class Container extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
        <Footer />
        <ModalFrame />
      </div>
    )
  }
}

export default Container