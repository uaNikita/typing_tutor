import React, { Component } from 'react'

import Footer from './Footer.jsx';

class Container extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default Container