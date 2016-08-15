import React, {Component} from 'react'
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPas from './ForgotPas.jsx';
import classNames from 'classNames';


class Authorization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'Login',
    };
  }

  render() {
    let content = ''

    switch (this.props.modalName) {
      case 'Login':
        content = <Login />
        break;
      case 'Registration':
        content = <Register />
        break;
      default:
        content = <ForgotPas />
        break;
    }

    let tabs = ['Login', 'Registration'].map(function (tab) {
      let className = 'menu__item';

      if (this.props.modalName === tab) {
        className = classNames(className, 'menu__item_selected');
      }

      return <a className={className} href onClick={ this._onTabClickHandler.bind(this, tab) }>{tab}</a>
    }.bind(this));


    return (
      <div className="auth">
        {tabs}
        {content}
      </div>
    )
  }

  _onTabClickHandler(tab, e) {
    e.preventDefault();

    this.props.openModal(tab);
  }
}

export default Authorization