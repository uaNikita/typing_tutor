import { connect } from 'react-redux'
import Textarea from '../components/Textarea.jsx'

const mapStateToProps = (state) => {

 let text = state.keyboard.textEntities[state.keyboard.currentTextId];

  return {
    typed: text.typed,
    nonTyped : text.last
  }

}

export default connect(
  mapStateToProps
)(Textarea)
