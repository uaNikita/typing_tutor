import React, { Component } from 'react';

class Learningarea extends Component {
  getCharsMarkup = string => string.split('').map((char, i) => {
    let c = char;

    if (char === ' ') {
      const key = char + i;

      c = <span key={key} className="learningarea__space">␣</span>;
    }

    return c;
  });

  render() {
    let typed = '';
    let last = '';

    const { lessonTyped, lessonLast } = this.props;

    if (lessonTyped) {
      const chars = this.getCharsMarkup(lessonTyped);

      typed = <span className="learningarea__typed">{chars}</span>;
    }

    if (lessonLast) {
      const chars = this.getCharsMarkup(lessonLast);

      last = <span className="learningarea__non-typed">{chars}</span>;
    }

    return (
      <div className="learningarea">
        { typed }
        <span className="learningarea__cursor" />
        { last }
      </div>
    );
  }
}

export default Learningarea;
