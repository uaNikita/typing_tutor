import React, {Component} from 'react';

class Learningarea extends Component {

  render() {
    let typed = '';
    let last = '';

    const {lessonTyped, lessonLast} = this.props

    if (lessonTyped) {
      let chars = this._getCharsMarkup(lessonTyped)

      typed = <span className="learningarea__typed">{chars}</span>
    }

    if (lessonLast) {
      let chars = this._getCharsMarkup(lessonLast)

      last = <span className="learningarea__non-typed">{chars}</span>
    }

    return (
      <div className='learningarea'>
        { typed }
        <span className="learningarea__cursor"></span>
        { last }
      </div>
    )
  }

  _getCharsMarkup(string) {

    return string.split('').map((char, idx) => {

      if (char === ' ') {
        char = <span key={idx} className="learningarea__space">␣</span>
      }

      return char;

    });

  }
}

export default Learningarea