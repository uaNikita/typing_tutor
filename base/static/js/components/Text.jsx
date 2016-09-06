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
            currentTextId,
            selectText,
            refreshText
          } = this.props;

    if (typed) {
      var refresh = <span onClick={() => refreshText(id)} className="text__reload fa fa-refresh" />
    }

    var select;


    console.log(id, currentTextId);

    if (id === currentTextId) {
      select = <span className="text__select text__select_selected">This text is selected</span>
    } else {
      select = <a onClick={this._onClickSelectText.bind(this, id)} className="text__select" href>Select this text to type</a>
    }

    return (
      <div className="text">

        <div className="text__buttons">
          {refresh}

          {select}

        </div>

        <h3 className="text__title">
          {title}
        </h3>

        <span className="text__typed">{typed}</span>
        <span className="text__last">{last}</span>
      </div>
    )
  }

  _onClickSelectText(id, e) {
    e.preventDefault();

    this.props.selectText(id);
  }
}

export default Texts
