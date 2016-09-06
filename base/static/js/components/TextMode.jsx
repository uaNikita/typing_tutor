import React, {Component} from 'react';
import {Link} from 'react-router'

import Ps from 'perfect-scrollbar';
import classNames from 'classNames';

import AddTextForm from '../containers/AddTextForm.jsx';

class TextMode extends Component {

  componentDidMount() {
    Ps.initialize(this._texts);
  }

  render() {
    const self = this;
    const {texts, currentTextId} = this.props

    var textsBlock = texts.map(obj => {
      let clsN = 'settings-text__text'
      let textId = parseInt(obj.textId, 10)
      let refresh = '';


      if (textId === currentTextId) {
        clsN = classNames(clsN, 'settings-text__text-selected')
      }

      // if (obj.typed) {
      //   refresh = <span onClick={() => refreshText(id)} className="settings-text__text-reload fa fa-refresh" />
      // }
      // {/*onClick={() => onSelectText(textId)}*/}

      return <div className="settings-text__text-wrap" key={ textId }>
        {refresh}
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
    })

    return (
      <div className="settings-text">
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

  _onSelectText(textId, e) {
    if (e.target.nodeName.toLowerCase() === 'a') {
      return;
    }

    this.props.selectText(textId);
  }
}

export default TextMode
