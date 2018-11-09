import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form/immutable';
import format from 'date-fns/format';

import keyboards from 'Constants/keyboards';
import modes from 'Constants/modes';

import { validateDate } from 'Utils/validation';

import Loader from 'Blocks/Loader/component';
import RenderField from 'Blocks/RenderField/component';
import DayPickerField from './DayPickerField/component';

import styles from './statistic.module.styl';

class Block extends Component {
  state = {
    emptyCharts: false,
    mode: undefined,
    keyboard: undefined,
    from: undefined,
    to: undefined,
  };

  chartCharactersEl = React.createRef()

  chartHitsTyposEl = React.createRef()

  chartSpeedEl = React.createRef()

  chartDurabilityEl = React.createRef()

  componentDidMount() {
    const data = this.getChartsData();

    // eslint-disable-next-line global-require
    const Chartist = require('chartist');

    this.chartCharacters = new Chartist.Bar(
      this.chartCharactersEl.current,
      data.characters,
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
      data.hitsTypos,
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
      data.speed,
      {
        axisY: {
          onlyInteger: true,
        },
        axisX: {
          showGrid: false,
        },
      },
    );

    this.chartDurability = new Chartist.Bar(
      this.chartDurabilityEl.current,
      data.durability,
      {
        axisX: {
          showGrid: false,
        },
        axisY: {
          labelInterpolationFnc: value => format(value, 'm:ss'),
        },
      },
    );
  }

  componentDidUpdate(prevProps) {
    const {
      props: {
        statistic,
      },
    } = this;

    if (!prevProps.statistic && statistic) {
      this.updateCharts();
    }
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
        if (state.to && state.to.getTime) {
          const day = 24 * 60 * 60 * 1000;

          to = s.end < (state.to.getTime() + day);
        }

        return mode && keyboard && from && to;
      });
  };

  getChartsData = () => {
    const {
      state: {
        from,
        to,
      },
    } = this;

    const statistic = this.getFilteredStatistic();

    const data = {
      characters: {
        labels: [],
        series: [[], []],
      },
      hitsTypos: {
        labels: [],
        series: [[], []],
      },
      speed: {
        labels: [],
        series: [[]],
      },
      durability: {
        labels: [],
        series: [[]],
      },
    };

    let dateFormat = 'YYYY MMM DD, HH:mm';

    if (from && to) {
      dateFormat = 'HH:mm';

      if (to.getYear() - from.getYear() > 0) {
        dateFormat = 'YYYY MMM DD, HH:mm';
      }
      else if (to.getMonth() - from.getMonth() > 0) {
        dateFormat = 'MMM DD, HH:mm';
      }
      else if (to.getDate() - from.getDate() > 0) {
        dateFormat = 'DD, HH:mm';
      }
    }

    statistic
      .map(({ start, end, presses }) => {
        const date = format(start, dateFormat);
        const totalMinutes = (end - start) / (1000 * 60);
        const totalHits = _.sumBy(presses, 'hits');

        // hit and typos
        data.hitsTypos.labels.push(date);
        data.hitsTypos.series[0].push(_.sumBy(presses, 'hits'));
        data.hitsTypos.series[1].push(_.sumBy(presses, 'typos'));

        // speed
        data.speed.labels.push(date);
        data.speed.series[0].push(totalHits / totalMinutes);

        // durability
        data.durability.labels.push(date);
        data.durability.series[0].push(end - start);

        return presses;
      })
      .flatten()
      .each((c) => {
        // characters
        const { character } = c;
        let { hits, typos } = c;

        hits = hits || 0;
        typos = typos || 0;

        const index = data.characters.labels.indexOf(character);

        if (index === -1) {
          data.characters.labels.push(character);

          data.characters.series[0].push(hits);
          data.characters.series[1].push(typos);
        }
        else {
          data.characters.series[0][index] += hits;
          data.characters.series[1][index] += typos;
        }
      });

    return data;
  };

  updateCharts = () => {
    const data = this.getChartsData();

    if (data.characters.labels.length) {
      this.setState(
        { emptyCharts: false },
        () => {
          this.chartCharacters.update(data.characters);
          this.chartHitsTypos.update(data.hitsTypos);
          this.chartSpeed.update(data.speed);
          this.chartDurability.update(data.durability);
        },
      );
    }
    else {
      this.setState({
        emptyCharts: true,
      });
    }
  };

  getOptimizedValue = mode => mode || undefined;

  handleChangeMode = (e, mode) => (
    this.setState(
      { mode: this.getOptimizedValue(mode) },
      this.updateCharts,
    )
  );

  handleChangeKeyboard = (e, keyboard) => (
    this.setState(
      { keyboard: this.getOptimizedValue(keyboard) },
      this.updateCharts,
    )
  );

  handleChangeFrom = day => (
    this.setState(
      { from: this.getOptimizedValue(day) },
      this.updateCharts,
    )
  );

  handleChangeTo = day => (
    this.setState(
      { to: this.getOptimizedValue(day) },
      this.updateCharts,
    )
  );

  render() {
    const {
      props: {
        statistic,
        change,
      },
      state: {
        emptyCharts,
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

    const chartsClassName = classNames({
      hide: !statistic || emptyCharts,
    });

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

        {emptyCharts && <p styleName="no-data">No data</p>}

        <div styleName={chartsClassName}>
          <h3 styleName="title">Hits and typos depend on characters</h3>
          <div styleName="chart chart_characters" ref={this.chartCharactersEl} />

          <h3 styleName="title">Hits and typos depend on sessions</h3>
          <div styleName="chart chart_hits-typos" ref={this.chartHitsTyposEl} />

          <h3 styleName="title">Speed depends on sessions</h3>
          <div styleName="chart chart_speed" ref={this.chartSpeedEl} />

          <h3 styleName="title">Durability of sessions</h3>
          <div styleName="chart chart_durability" ref={this.chartDurabilityEl} />
        </div>

        {!statistic && <Loader styleName="loader" size="30" />}
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
