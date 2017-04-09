import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classNames';

import Switcher from './Switcher.jsx';

class Texts extends Component {

   render() {
      const self = this;
      const {texts, currentTextId, mode} = this.props;

      let switcherProps = {
         label: {
            title: 'Learning mode on'
         },
         input: {
            checked: true,
            readOnly: true,
         }
      };

      if (mode !== 'text') {

         switcherProps.label.title = 'Learning mode off';

         switcherProps.input = {
            ...switcherProps.input,
            checked: false,
            readOnly: false,
            onChange: this._onSwitcherChange.bind(this)
         }

      }

      let addTextLink;

      if (texts.length < 10) {

         addTextLink = <Link to={ '/settings/text-mode/add-text'}>Add new text</Link>

      }

      const textEls = texts.map(obj => {
         let clsN = 'settings-text__text';
         let textId = obj.textId;

         let props = {
            key: textId,
            title: obj.title,
            className: clsN
         };

         if (textId === currentTextId) {

            props.className = classNames(props.className, 'settings-text__text_selected');

            props.ref = t => {
               self._selectedText = t;
            };

         } else {

            props.onClick = self._onHandleTextClick.bind(self, textId);

         }

         return (
           <div {...props}>
              <h3 className="settings-text__text-title">
                 <Link to={'/settings/text-mode/text/' + textId}>
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

           <div className="settings-text__actions">

              <Switcher {...switcherProps} />

              {addTextLink}

           </div>

           <div className="settings-text__texts">
              { textEls }
           </div>

        </div>

      )
   }

   _onSwitcherChange() {

      this.props.setMode('text');

   }

   _onHandleTextClick(textId, e) {
      if (e.target.nodeName.toLowerCase() === 'a') {
         return;
      }

      this.props.selectText(textId);
   }
}

export default Texts
