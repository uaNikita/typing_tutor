import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form/immutable';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import keyboards from 'Constants/keyboards';
import modes from 'Constants/modes';

import RenderField from 'Blocks/RenderField/component';

import styles from './statistic.module.styl';

class Block extends Component {
  constructor(props) {
    super(props);

    this.chartEl = React.createRef();
  }

  state = {
    mode: undefined,
    keyboard: undefined,
    from: undefined,
    to: undefined,
  }

  componentDidMount() {
    // eslint-disable-next-line global-require
    const Chartist = require('chartist');

    this.chart = new Chartist.Bar(
      this.chartEl.current,
      this.getChartistData(),
      {
        axisY: {
          onlyInteger: true,
        },
        axisX: {
          showGrid: false,
        },
      },
    );
  }

  componentDidUpdate() {
    this.chart.update(this.getChartistData());
  }

  getChartistData = () => {
    const {
      props: {
        statistic,
      },
      state,
    } = this;

    const labels = [];
    const series = [[], []];

    _(statistic)
      .filter((s) => {
        let mode = true;
        if (state.mode) {
          mode = s.mode === state.mode;
        }

        let keyboard = true;
        if (state.keyboard) {
          keyboard = s.keyboard === state.keyboard;
        }

        let from = true;
        if (state.from) {
          from = s.from > state.from;
        }

        let to = true;
        if (state.to) {
          to = s.to < state.to;
        }

        return mode && keyboard && from && to;
      })
      .map('presses')
      .flatten()
      .each((c) => {
        const { character } = c;
        let { hits, typos } = c;

        hits = hits || 0;
        typos = typos || 0;

        const index = labels.indexOf(character);

        if (index === -1) {
          labels.push(character);

          series[0].push(hits);
          series[1].push(typos);
        }
        else {
          series[0][index] += hits;
          series[1][index] += typos;
        }
      });

    return {
      labels,
      series,
    };
  }

  handleChangeMode = (e, mode) => this.setState({ mode });

  handleChangeKeyboard = (e, keyboard) => this.setState({ keyboard });

  handleChangeFrom = (selectedDay, modifiers, dayPickerInput) => {
    const {
      props: {
        change,
      },
    } = this;

    change('from', dayPickerInput.state.value);
  };

  render() {
    return (
      <Fragment>
        <div styleName="filters">
          <Field
            onChange={this.handleChangeMode}
            name="mode"
            component={RenderField}
            type="select"
            label="Mode"
          >
            {modes.map(name => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Field>

          <Field
            onChange={this.handleChangeKeyboard}
            name="keyboard"
            component={RenderField}
            type="select"
            label="Keyboard"
          >
            {keyboards.map(({ name }) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Field>

          <DayPickerInput
            component={props => (
              <Field
                {...props}
                name="from"
                component={RenderField}
                label="From"
              />
            )}
            onDayChange={this.handleChangeFrom}
          />
        </div>

        <div styleName="chart" ref={this.chartEl} />
      </Fragment>
    );
  }
}

export default reduxForm({
  form: 'statistic',
})(CSSModules(Block, styles, {
  allowMultiple: true,
}));
