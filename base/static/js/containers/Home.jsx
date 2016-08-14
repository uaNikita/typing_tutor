import {connect} from 'react-redux'
import Home from '../components/Home.jsx'

const mapStateToProps = (state) => {
  let spendTime = (Date.now() - state.startTypingTime) / (1000 * 60);


  return {
    typedChars: state.rightTypedChars,
    speed: parseInt((state.rightTypedChars + state.errors) / spendTime, 10),
    errors: state.errors,
    mode: state.mode
  }
}

export default connect(
  mapStateToProps
)(Home)
