import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import styles from './statistic.module.styl';

class Block extends Component {
  constructor(props) {
    super(props);

    this.chartEl = React.createRef();
  }

  componentDidMount() {
    const {
      props: {
        statistic,
      },
    } = this;


    const labels = [];
    const series = [[], []];

    _(statistic)
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

    // eslint-disable-next-line global-require
    const Chartist = require('chartist');

    this.a = new Chartist.Bar(
      this.chartEl.current,
      {
        labels,
        series,
      },
      {
        axisY: {
          onlyInteger: true
        },
        axisX: {
          showGrid: false,
        },
      },
    );
  }

  render() {
    return (
      <Fragment>
        <div className="filters">
          <select name="" id="">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </select>
        </div>

        <div styleName="chart" ref={this.chartEl} />
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
