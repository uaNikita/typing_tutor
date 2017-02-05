import React, {Component} from 'react';
import {Link} from 'react-router';

class LearningMode extends Component {

   render() {
      const {lesson} = this.props;

      let lessonKeys = lesson.split('').map((char, idx) => {
         if (char === ' ') {
            char = <span key={idx} className="learningarea__space">␣</span>;
         }

         return char;
      });

      let learningModePath = '/settings/learning-mode/';

      return (
        <div className="settings-learning">

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

      this.props.setMode('learning');

   }

}

export default LearningMode
