import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningKeyboardTab from '../components/LearningKeyboardTab.jsx'

const mapStateToProps = (state) => {
  return {
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningKeyboardTab)
