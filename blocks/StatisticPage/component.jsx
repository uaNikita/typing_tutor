import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form/immutable';

import keyboards from 'Constants/keyboards';
import modes from 'Constants/modes';

import { validateDate } from 'Utils/validation';

import RenderField from 'Blocks/RenderField/component';
import DayPickerField from './DayPickerField/component';

import styles from './statistic.module.styl';


class Block extends Component {
  constructor(props) {
    super(props);

    this.chartCharactersEl = React.createRef();
    this.chartHitsTyposEl = React.createRef();
    this.chartSpeedEl = React.createRef();
  }

  state = {
    mode: undefined,
    keyboard: undefined,
    from: undefined,
    to: undefined,
  };

  componentDidMount() {
    const filteredStatistic = this.getFilteredStatistic();

    // eslint-disable-next-line global-require
    const Chartist = require('chartist');

    this.chartCharacters = new Chartist.Bar(
      this.chartCharactersEl.current,
      this.getCharactersData(filteredStatistic),
      {
        axisY: {
          onlyInteger: true,
        },
        axisX: {
          showGrid: false,
        },
      },
    );

    this.chartHitsTypos = new Chartist.Bar(
      this.chartHitsTyposEl.current,
      this.getHitsTyposData(filteredStatistic),
      {
        axisY: {
          onlyInteger: true,
        },
        axisX: {
          showGrid: false,
        },
      },
    );

    this.chartSpeed = new Chartist.Bar(
      this.chartSpeedEl.current,
      this.getCharactersData(filteredStatistic),
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
    const filteredStatistic = this.getFilteredStatistic();

    const chartCharactersData = this.getCharactersData(filteredStatistic);
    this.chartCharacters.update(chartCharactersData);

    const chartHitsTyposData = this.getHitsTyposData(filteredStatistic);
    this.chartHitsTypos.update(chartHitsTyposData);

    const chartSpeedData = this.getCharactersData(filteredStatistic);
    this.chartSpeed.update(chartSpeedData);
  }

  getFilteredStatistic = () => {
    const {
      props: {
        statistic,
      },
      state,
    } = this;

    // returns LodashWrapper
    return _(statistic)
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
        if (state.from && state.from.getTime) {
          from = s.start > state.from.getTime();
        }

        let to = true;
        if (state.to && state.from.to) {
          to = s.start < state.to.getTime();
        }

        return mode && keyboard && from && to;
      });
  }

  getCharactersData = (statistic) => {
    const labels = [];
    const series = [[], []];

    statistic
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

  getHitsTyposData = (statistic) => {
    const labels = [];
    const series = [[], []];

    statistic
      .each((c) => {
        console.log('c', c);

        // const { character } = c;
        // let { hits, typos } = c;
        //
        // hits = hits || 0;
        // typos = typos || 0;
        //
        // const index = labels.indexOf(character);
        //
        // if (index === -1) {
        //   labels.push(character);
        //
        //   series[0].push(hits);
        //   series[1].push(typos);
        // }
        // else {
        //   series[0][index] += hits;
        //   series[1][index] += typos;
        // }
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
            label="From"
            change={change}
            onChange={this.handleChangeFrom}
          />

          <DayPickerField
            name="to"
            label="To"
            change={change}
            onChange={this.handleChangeTo}
          />
        </div>

        <h3 styleName="title">Hits and typos depend on characters</h3>
        <div styleName="chart chart_characters" ref={this.chartCharactersEl} />

        <h3 styleName="title">Hits and typos depend on sessions</h3>
        <div styleName="chart chart_hits-typos" ref={this.chartHitsTyposEl} />

        <h3 styleName="title">Speed depends on sessions</h3>
        <div styleName="chart chart_speed" ref={this.chartSpeedEl} />
      </Fragment>
    );
  }
}

const validate = values => ({
  ...validateDate('from', values.get('from')),
  ...validateDate('to', values.get('to')),
});


export default reduxForm({
  form: 'statistic',
  validate,
})(CSSModules(Block, styles, {
  allowMultiple: true,
}));
