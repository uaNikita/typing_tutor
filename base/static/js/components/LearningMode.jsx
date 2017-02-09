import React, {Component} from 'react';
import {Link} from 'react-router';
import Switcher from './Switcher.jsx';

class LearningMode extends Component {

   render() {
      const {lesson, mode} = this.props;

      let lessonKeys = lesson.split('').map((char, idx) => {
         if (char === ' ') {
            char = <span key={idx} className="learningarea__space">␣</span>;
         }

         return char;
      });

      let learningModePath = '/settings/learning-mode/';

      let switcherProps = {
         label: {
            title: 'Learning mode on'
         },
         input: {
            checked: true,
            readOnly: true,
         }
      };

      if (mode !== 'learning') {

         switcherProps.label.title = 'Learning mode off';

         switcherProps.input = {
           ...switcherProps.input,
            checked: false,
            readOnly: false,
            onChange: this._onSwitcherChange.bind(this)
         }

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

                 <div className='settings-learning__modes-menu-item'>
                    <Link
                      className="menu__item"
                      activeClassName="menu__item_selected"
                      to={learningModePath + 'fingers'}>
                       By fingers
                    </Link>
                 </div>

                 <div className='settings-learning__modes-menu-item'>
                    <Link
                      className="menu__item"
                      activeClassName="menu__item_selected"
                      to={learningModePath + 'free'}>
                       Free
                    </Link>
                 </div>
              </div>

              <div className="settings-learning__modes-content">

                 { this.props.children }

              </div>
           </div>

        </div>
      )
   }

   _onSwitcherChange() {
console.log('_onSwitcherChange');
      this.props.setMode('learning');

   }

}

export default LearningMode
