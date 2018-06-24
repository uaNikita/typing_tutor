import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Slider from 'rc-slider';

import LearningView from 'Blocks/LearningView/component';
import Key from 'Blocks/Key/component';
import LearningModeButton from '../LearningModeButton/container';

class LearningFree extends Component {
  constructor(props) {
    super(props);

    const {
      options: {
        maxLettersInWord,
      },
    } = props;

    const maxLettersInWordMin = 1;
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

  handleChangeMaxLettersInWord = (maxLettersInWord) => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({ maxLettersInWord });
  };

  render() {
    const {
      props: {
        options: {
          letters,
        },
        keys,
        updateOptions,
        example,
      },
      maxLettersInWordSliderProps,
    } = this;

    const keyNodes = keys.map((obj) => {
      let className = 'keyboard__key';

      const keyProps = {
        'data-key': obj.id,
        'data-finger': obj.finger === 'index' ? `${obj.hand}-${obj.finger}` : obj.finger,
      };

      if (obj.type === 'letter') {
        if (letters.indexOf(obj.key) + 1) {
          if (letters.length > 1) {
            keyProps.onClick = () => updateOptions({
              letters: ['remove', obj.key],
            });
          }

          className = classNames(className, 'keyboard__key_selected');
        }
        else {
          keyProps.onClick = () => updateOptions({
            letters: ['add', obj.key],
          });
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      keyProps.className = className;

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

    return (
      <Fragment>
        <h4 className="settings-learning__title">
          Example
        </h4>
        <LearningView className="settings-learning__view" lesson={example} />

        <h4 className="settings-learning__title">
          Settings
        </h4>

        <LearningModeButton toMode="free" />

        <div className="settings-learning__item">
          <p className="settings-learning__label">
            Max word length:
          </p>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <Slider {...maxLettersInWordSliderProps} />
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}

export default LearningFree;
