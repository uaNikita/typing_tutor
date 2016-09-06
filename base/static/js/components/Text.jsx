import React, {Component} from 'react';
import {Link} from 'react-router'
import classNames from 'classNames';

class Texts extends Component {

  render() {
    const {
            id,
            title,
            typed,
            last,
            refreshText
          } = this.props
    
    if (typed) {
      var refresh = <span onClick={() => refreshText(id)} className="text__reload fa fa-refresh" />
    }

    return (
      <div className="text">
        {refresh}
        <h3 className="text__title">
          {title}
        </h3>

        <span className="text__typed">{typed}</span>
        <span className="text__last">{last}</span>
      </div>
    )
  }
}

export default Texts
