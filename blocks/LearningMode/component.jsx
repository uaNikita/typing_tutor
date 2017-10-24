import React, { Component } from 'react';

import SubMenu from 'Blocks/SubMenu/component.jsx';
import LearningFingers from './LearningFingers/container';
import LearningFree from './LearningFree/container';
import Switcher from '../Switcher.jsx';

class LearningMode extends Component {
  onSwitcherChange = () => {
    this.props.setMainMode('learning');
  };

  render() {
    const {
      lesson,
      learningMode,
      mode,
    } = this.props;

    const lessonKeys = lesson.split('').map(char => {
      let charEl = char;

      if (char === ' ') {
        charEl = <span key={char} className="learningarea__space">␣</span>;
      }

      return charEl;
    });

    const switcherProps = {
      label: {
        title: 'Learning mode on',
      },
      input: {
        checked: true,
        readOnly: true,
      },
    };

    if (mode !== 'learning') {
      switcherProps.label.title = 'Learning mode off';

      switcherProps.input = {
        ...switcherProps.input,
        checked: false,
        readOnly: false,
        onChange: this.onSwitcherChange,
      };
    }

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

        <div className="learningarea">
          {lessonKeys}
        </div>

        <div className="settings-learning__modes">
          <div className="settings-learning__modes-menu">
            <h4 className="settings-learning__modes-menu-title">Keys set</h4>

            <SubMenu links={[
              {
                url: '/learning-mode/fingers',
                text: 'By fingers',
              },
              {
                url: '/learning-mode/free',
                text: 'Free',
              },
            ]} />
          </div>

          <div className="settings-learning__modes-content">
            <Mode />
          </div>
        </div>

      </div>
    );
  }
}

export default LearningMode;
