import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form/immutable';

import keyboards from 'Constants/keyboards';
import modes from 'Constants/modes';

import RenderField from 'Blocks/RenderField/component';
import DayPickerField from './DayPickerField/component';

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
  };

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
          from = s.start > state.from.getTime();
        }

        let to = true;
        if (state.to) {
          to = s.start < state.to.getTime();
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
  };

  getOptimizedValue = mode => mode || undefined;

  handleChangeMode = (e, mode) => (
    this.setState({
      mode: this.getOptimizedValue(mode),
    })
  );

  handleChangeKeyboard = (e, keyboard) => (
    this.setState({
      mode: this.getOptimizedValue(keyboard),
    })
  );

  handleChangeFrom = day => (
    this.setState({
      from: this.getOptimizedValue(day),
    })
  );

  handleChangeTo = day => (
    this.setState({
      from: this.getOptimizedValue(day),
    })
  );

  render() {
    const {
      props: {
        change,
      },
    } = this;

    const modesOptions = modes.map(name => (
      <option key={name} value={name}>
        {name}
      </option>
    ));

    modesOptions.unshift(<option key="all" value="">All</option>);

    const keyboardsOptions = keyboards.map(({ name }) => (
      <option key={name} value={name}>
        {name}
      </option>
    ));

    keyboardsOptions.unshift(<option key="all" value="">All</option>);

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
            {modesOptions}
          </Field>

          <Field
            onChange={this.handleChangeKeyboard}
            name="keyboard"
            component={RenderField}
            type="select"
            label="Keyboard"
          >
            {keyboardsOptions}
          </Field>

          <DayPickerField
            name="from"
            component={RenderField}
            label="From"
            change={change}
            onChange={this.handleChangeFrom}
          />

          <DayPickerField
            name="to"
            component={RenderField}
            label="To"
            change={change}
            onChange={this.handleChangeTo}
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
