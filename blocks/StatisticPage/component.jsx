import React, { Component } from 'react';

class Block extends Component {
  constructor(props) {
    super(props);

    this.chartEl = React.createRef();
  }

  componentDidMount() {
    const Chartist = require('chartist');

    this.a = new Chartist.Bar(
      this.chartEl.current,
      {
        labels: [
          'First quarter of the year',
          'Second quarter of the year',
          'Third quarter of the year',
          'Fourth quarter of the year'],
        series: [
          [60000, 40000, 80000, 70000],
          [40000, 30000, 70000, 65000],
          [8000, 3000, 10000, 6000],
        ],
      },
      {
        seriesBarDistance: 10,
        axisX: {
          offset: 60,
        },
        axisY: {
          offset: 80,
          scaleMinSpace: 15,
        },
      },
    );
  }

  render() {
    return (
      <div ref={this.chartEl} />
    );
  }
}

export default Block;
