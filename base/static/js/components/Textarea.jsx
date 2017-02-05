import React, { Component } from 'react';

class Textarea extends Component {

  componentDidMount() {
     $(this._textarea).perfectScrollbar();
  }

  render() {

    const { typed, nonTyped } = this.props;

    return (
      <div className='textarea' ref={(t) => this._textarea = t}>
        <span className="textarea__typed">{typed}</span>
        <span className="textarea__cursor"></span>
        <span className="textarea__non-typed">{nonTyped}</span>
      </div>
    )
  }
  
}

export default Textarea