import React, {Component} from 'react';
import {Link} from 'react-router'

import Ps from 'perfect-scrollbar';
import classNames from 'classNames';

import AddTextForm from '../containers/AddTextForm.jsx';
import Switcher from './Switcher.jsx';

class TextMode extends Component {

  componentDidMount() {
    Ps.initialize(this._texts);
  }

  render() {
    const self = this;
    const {texts, currentTextId, mode} = this.props

    var textsBlock = texts.map(obj => {
      let clsN = 'settings-text__text';
      let textId = parseInt(obj.textId, 10);

      if (textId === currentTextId) {
        clsN = classNames(clsN, 'settings-text__text-selected');
      }



      return <div className="settings-text__text-wrap" key={ textId }>
        <div className={ clsN } title={obj.title} onClick={self._onSelectText.bind(self, textId)}>
          <h3 className="settings-text__text-title">
            <Link to={'/settings/text/' + textId}>
              {obj.title}
            </Link>
          </h3>

          <div className="settings-text__text-content">
            {obj.text}
          </div>
        </div>
      </div>
    });

    let switcherChecked = false;

    if (mode === 'text') {
      switcherChecked = true;
    }
    
    return (
      <div className="settings-text">
        <Switcher checked={switcherChecked} onChange={this._onSwitcherChange.bind(this)} />

        <div className="settings-text__item">
          <label htmlFor="" className="settings-text__label">
            Current text
          </label>
          <div className="settings-text__item-ctrl settings-text__ctrl-texts">
            <div className="settings-text__texts" ref={(t) => this._texts = t}>
              { textsBlock }
            </div>
          </div>
        </div>
        <div className="settings-text__item">
          <label htmlFor="" className="settings-text__label">
            Add new text
          </label>
          <div className="settings-text__item-ctrl">
            <AddTextForm className="settings-text__add-text-form" />
          </div>
        </div>
      </div>

    )
  }

  _onSwitcherChange(e) {

    if (e.target.checked) {
      this.props.setMode('text');
    }

  }

  _onSelectText(textId, e) {
    if (e.target.nodeName.toLowerCase() === 'a') {
      return;
    }

    this.props.selectText(textId);
  }
}

export default TextMode
