import React, { Component } from 'react';
import classNames from 'classnames';

class ModeItem extends Component {
  handleModeClick = e => {
    e.preventDefault();

    const {
      id,
      setLearningMode,
    } = this.props;

    setLearningMode(id);
  }

  render() {
    const {
      selected,
      text,
    } = this.props;

    let className = 'menu__item';

    if (selected) {
      className = classNames(className, 'menu__item_selected');
    }

    return (
      <div className="settings-learning__modes-menu-item" onClick={this.handleModeClick}>
        <a className={className} href>{text}</a>
      </div>
    );
  }
}

export default ModeItem;
