import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Text from './Text.jsx';
import Switcher from '../../Switcher.jsx';

class Texts extends Component {
  onSwitcherChange = () => {
    this.props.setMode('text');
  };

  onHandleTextClick(textId, e) {
    if (e.target.nodeName.toLowerCase() === 'a') {
      return;
    }

    this.props.selectText(textId);
  }

  render() {
    const self = this;
    const { texts, currentTextId, mode } = this.props;

    const switcherProps = {
      label: {
        title: 'Learning mode on',
      },
      input: {
        checked: true,
        readOnly: true,
      },
    };

    if (mode !== 'text') {
      switcherProps.label.title = 'Learning mode off';

      switcherProps.input = {
        ...switcherProps.input,
        checked: false,
        readOnly: false,
        onChange: this.onSwitcherChange,
      };
    }

    let addTextLink;

    if (texts.length < 10) {
      addTextLink = <Link to="/settings/text-mode/add-text">Add new text</Link>;
    }

    const textEls = texts.map(obj => {
      const clsN = 'settings-text__text';
      const { textId } = obj;

      const props = {
        id: textId,
        title: obj.title,
        className: clsN,
        text: obj.text,
      };

      if (textId === currentTextId) {
        props.className = classNames(props.className, 'settings-text__text_selected');
      }
      else {
        props.onClick = self.onHandleTextClick;
      }

      return (
        <Text {...props} />
      );
    });

    return (
      <div className="settings-text">

        <div className="settings-text__actions">

          <Switcher {...switcherProps} />

          {addTextLink}

        </div>

        <div className="settings-text__texts">
          {textEls}
        </div>

      </div>

    );
  }
}

export default Texts;
