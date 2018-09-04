import React, { Component } from 'react';

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

    const Chartist = require('chartist');

    this.a = new Chartist.Bar(
      this.chartEl.current,
      {
        labels: [
          'a',
          'b',
          'c',
          'd'
        ],
        series: [
          [3, 4, 1, 6],
          [2, 2, 3, 2],
        ],
      }
    );
  }

  render() {
    return (
      <div ref={this.chartEl} />
    );
  }
}

export default Block;
