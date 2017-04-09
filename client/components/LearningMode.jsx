import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import _ from 'lodash';
import classNames from 'classNames';
import LearningFingers from '../containers/LearningFingers.jsx';
import LearningFree from '../containers/LearningFree.jsx';
import Switcher from './Switcher.jsx';

class LearningMode extends Component {

   render() {
      const {
         lesson,
         learningMode,
         mode,
         match: {
            url
         }
      } = this.props;
      
      let lessonKeys = lesson.split('').map((char, idx) => {
         if (char === ' ') {
            char = <span key={idx} className="learningarea__space">␣</span>;
         }

         return char;
      });

      let switcherProps = {
         label: {
            title: 'Learning mode on'
         },
         input: {
            checked: true,
            readOnly: true
         }
      };

      if (mode !== 'learning') {

         switcherProps.label.title = 'Learning mode off';

         switcherProps.input = {
            ...switcherProps.input,
            checked: false,
            readOnly: false,
            onChange: this._onSwitcherChange.bind(this)
         };

      }

      let modes = [
         {
            id: 'fingers',
            text: 'By fingers'
         },
         {
            id: 'free',
            text: 'Free'
         }
      ];

      _.find(modes, { id: learningMode }).selected = true;

      const links = modes.map((mode, i) => {

         let className = 'menu__item';

         if (mode.selected) {
            className = classNames(className, 'menu__item_selected');
         }

         return <div className='settings-learning__modes-menu-item' key={i} onClick={this._handleModeClick.bind(this, mode.id)}>
            <a className={className} href>{mode.text}</a>
         </div>;

      });


      let Mode;

      switch (learningMode) {
         case 'fingers':
            Mode = LearningFingers;
            break;
         case 'free':
            Mode = LearningFree;
            break;
      }

      return (

         <div className="settings-learning">

            <Switcher {...switcherProps} />

            <div className='learningarea'>
               {lessonKeys}
            </div>

            <div className="settings-learning__modes">
               <div className="settings-learning__modes-menu">
                  <h4 className="settings-learning__modes-menu-title">Keys set</h4>
                  {links}
               </div>

               <div className="settings-learning__modes-content">
                  <Mode />
               </div>
            </div>

         </div>
      );
   }

   _onSwitcherChange() {

      this.props.setMainMode('learning');

   }

   _handleModeClick(learningMode, e) {

      e.preventDefault();

      this.props.setLearningMode(learningMode);

   }

}

export default LearningMode;
