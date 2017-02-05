import React, {Component} from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import classNames from 'classNames';

import AddTextForm from '../containers/AddTextForm.jsx';

class TextMode extends Component {

   componentDidMount() {

      const $texts = $(this._texts);

      const selectedTextOffsetTop = $(this._selectedText).offset().top;

      $texts.scrollTop(selectedTextOffsetTop - $texts.offset().top - 120);

      $texts.perfectScrollbar();

   }

   render() {
      const self = this;
      const {texts, currentTextId} = this.props;

      var textsBlock = texts.map(obj => {
         let clsN = 'settings-text__text';
         let textId = parseInt(obj.textId, 10);

         let props = {
            key: textId,
            title: obj.title,
            className: clsN
         };

         if (textId === currentTextId) {

            props.className = classNames(props.className, 'settings-text__text-selected');

            props.ref = t => {
               self._selectedText = t;
            };

         } else {

            props.onClick = self._onSelectText.bind(self, textId);

         }

         return (
           <div {...props}>
              <h3 className="settings-text__text-title">
                 <Link to={'/settings/text/' + textId}>
                    {obj.title}
                 </Link>
              </h3>

              <div className="settings-text__text-content">
                 {obj.text}
              </div>
           </div>
         )
      });

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
