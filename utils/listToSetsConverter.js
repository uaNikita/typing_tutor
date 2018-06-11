import Immutable from 'immutable';

const setsPath = [
  ['main', 'pressedKeys'],
  ['main', 'pressedWrongKeys'],
  ['learning', 'free', 'options', 'letters'],
];

export default stateToConvert =>
  setsPath.reduce((state, path) =>
    state.setIn(path, Immutable.Set(state.getIn(path))), stateToConvert);
