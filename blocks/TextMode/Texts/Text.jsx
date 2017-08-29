import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Text extends Component {
  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const {
      id,
      title,
      className,
      onClick,
      text,
    } = this.props;

    return (
      <div key={id} title={title} className={className} onClick={onClick}>
        <h3 className="settings-text__text-title">
          <Link to={`/settings/text-mode/text/${id}`}>
            {title}
          </Link>
        </h3>

        <div className="settings-text__text-content">
          {text}
        </div>
      </div>

    );
  }
}

export default Text;
