import React, {Component} from 'react';
import {Link} from 'react-router'

class Modes extends Component {

  render() {

    return (

      <div className="mode">
        <menu className="mode__nav">
          <Link className="menu__item" activeClassName="menu__item_selected" to="/settings/mode/text">
            Text
          </Link>
          <span className="mode__nav-or"> or </span>
          <Link className="menu__item" activeClassName="menu__item_selected" to="/settings/mode/learning">
            Learning
          </Link>
        </menu>

        { this.props.children }
        
      </div>

    )
  }
}

export default Modes
