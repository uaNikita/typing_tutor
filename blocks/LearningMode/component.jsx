import React, { Component } from 'react';
import _ from 'lodash';
import LearningFingers from './LearningFingers/container.jsx';
import LearningFree from './LearningFree/container.jsx';
import ModeItem from './ModeItem/container.jsx';
import Switcher from '../Switcher.jsx';

class LearningMode extends Component {
  onSwitcherChange = () => {
    this.props.setMainMode('learning');
  }

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

    const modes = [
      {
        id: 'fingers',
        text: 'By fingers',
      },
      {
        id: 'free',
        text: 'Free',
      },
    ];

    _.find(modes, { id: learningMode }).selected = true;

    const links = modes.map(m => <ModeItem id={m.id} selected={m.selected} text={m.text} />);

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
            {links}
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
