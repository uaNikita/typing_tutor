import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classNames from 'classnames';

import Footer from '../Footer.jsx';
import Home from '../Home/container';
import Settings from '../Settings/container';

class Layout extends Component {
  componentDidUpdate() {
    const bodyClassList = document.body.classList;
    const bodyModalClass = 'modal__open';

    if (bodyClassList.contains(bodyModalClass)) {
      if (!this.props.modalName) {
        bodyClassList.remove(bodyModalClass);
      }
    }
    else if (this.props.modalName) {
      bodyClassList.add(bodyModalClass);
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
          <Route exact path="/" component={Home} />

          <Route path="/settings" component={Settings} />

          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;
