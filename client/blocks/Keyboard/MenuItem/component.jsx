import React, { Component } from 'react';
import classNames from 'classnames';

class MenuItem extends Component {
  onClickNameHandler() {
    const { setKeyboard, name } = this.props;

    setKeyboard(name);
  }

  render() {
    const { selected, name } = this.props;

    const props = {
      className: 'menu__item',
    };

    if (selected) {
      props.className = classNames(props.className, 'menu__item_selected');
    }
    else {
      props.onClick = this.onClickNameHandler;
    }

    return (
      <a {...props}>{name}</a>
    );
  }
}

export default MenuItem;
