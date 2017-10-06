import React, { Component } from 'react';

class Texts extends Component {
  onClickSelectText(id, e) {
    e.preventDefault();

    this.props.selectText(this.props.id);
  }

  render() {
    const {
      id,
      title,
      typed,
      last,
      currentTextId,
      refreshText,
    } = this.props;

    let refresh;

    if (typed) {
      refresh = <a href="" onClick={() => refreshText(id)} className="text__reload fa fa-refresh" />;
    }

    let select;

    if (id === currentTextId) {
      select = <span className="text__select text__select_selected">This text is selected</span>;
    }
    else {
      select = <a onClick={this.onClickSelectText} className="text__select" href>Select this text to type</a>;
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
    );
  }
}

export default Texts;
