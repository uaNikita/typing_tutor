import React, {Component} from 'react';
import { Link } from 'react-router'

import Ps from 'perfect-scrollbar';
import classNames from 'classNames';

import AddTextForm from '../containers/AddTextForm.jsx';

class TextMode extends Component {

  componentDidMount() {
    Ps.initialize(this._texts);
  }

  render() {
    const {texts, currentTextId} = this.props

    var textsBlock = texts.map(obj => {
      let clsN = 'mode__text'
      let id = parseInt(obj.id, 10)
      let refresh = '';

      const {onSelectText, refreshText} = this.props;

      if (id === currentTextId) {
        clsN = classNames(clsN, 'mode__text-selected')
      }

      if (obj.typed) {
        refresh = <span onClick={() => refreshText(id)} className="mode__text-reload fa fa-refresh" />
      }

      return <div className="mode__text-wrap" key={ obj.id }>
        {refresh}
        <div
          className={ clsN }
          title={obj.title}
          onClick={() => onSelectText(id)}
        >
          <h3 className="mode__text-title">
            {obj.title}
          </h3>
          <div className="mode__text-content">
            {obj.typed + obj.last}
          </div>
        </div>
      </div>
    })

    return (
      <div className="settings-text">
        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Current text
          </label>
          <div className="mode__item-ctrl mode__ctrl-texts">
            <div className="mode__texts" ref={(t) => this._texts = t}>
              { textsBlock }
            </div>
          </div>
        </div>
        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Add new text
          </label>
          <div className="mode__item-ctrl">
            <AddTextForm className="mode__add-text-form" />
          </div>
        </div>
      </div>

    )
  }
}

export default TextMode
