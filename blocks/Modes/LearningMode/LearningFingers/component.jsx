import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Slider from 'rc-slider';

import Key from 'Blocks/Key/component.jsx';
import LearningView from 'Blocks/LearningView/component.jsx';
import LearningModeButton from '../LearningModeButton/container';

class LearningFingers extends Component {
  constructor(props) {
    super(props);

    const {
      options: {
        maxLettersInWord,
      },
    } = props;

    const maxLettersInWordMin = 3;
    const maxLettersInWordMax = 10;

    this.maxLettersInWordSliderProps = {
      min: maxLettersInWordMin,
      max: maxLettersInWordMax,
      marks: this.getMarks(maxLettersInWordMin, maxLettersInWordMax),
      step: null,
      defaultValue: maxLettersInWord,
      onChange: this.handleChangeMaxLettersInWord,
    };
  }

  getMarks = (min, max) => _(_.range(min, max + 1))
    .map(i => [i, i])
    .fromPairs()
    .value();

  handleChangeMaxLettersInWord = maxLettersInWord => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({ maxLettersInWord });
  };

  handleChangeSetSize = setSize => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({ setSize });
  };

  render() {
    const {
      props: {
        options: {
          setSize,
        },
        keys,
        fingersSet,
        example,
      },
      maxLettersInWordSliderProps,
    } = this;

    let selectedLetters = _.clone(fingersSet);

    selectedLetters.splice(setSize);

    selectedLetters = _.concat(...selectedLetters);

    const keyNodes = keys.map(obj => {
      let className = 'keyboard__key';

      if (obj.type === 'letter') {
        if (selectedLetters.indexOf(obj.key) + 1) {
          className = classNames(className, 'keyboard__key_selected');
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      let { finger } = obj;

      if (finger === 'index') {
        finger = `${obj.hand}-${finger}`;
      }

      const keyProps = {
        className,
        'data-key': obj.id,
        'data-finger': finger,
      };

      return (
        <Key
          key={obj.id}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
          {...keyProps}
        />
      );
    });

    const setSizeMin = 1;
    const setSizeMax = fingersSet.length;

    const setSizeSliderProps = {
      min: setSizeMin,
      max: setSizeMax,
      marks: this.getMarks(setSizeMin, setSizeMax),
      step: null,
      defaultValue: setSize,
      onChange: this.handleChangeSetSize,
    };

    return (
      <Fragment>
        <h4 className="settings-learning__title">
Example
        </h4>
        <LearningView className="settings-learning__view" lesson={example} />

        <h4 className="settings-learning__title">
Settings
        </h4>

        <LearningModeButton toMode="fingers" />

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Max word length:
          </label>

          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <Slider {...maxLettersInWordSliderProps} />
          </div>
        </div>

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Extend fingers set:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <Slider {...setSizeSliderProps} />
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}


export default LearningFingers;
