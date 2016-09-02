export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LESSON_ALPHABET_SIZE:
      return (() => {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys;

        return assign({}, state, {
          learningAlphabetSize: action.alphabetSize,
          learningLesson: generateLesson(action.alphabetSize, state.learningMaxWordLength, keys),
        });
      })()

    case types.SET_LESSON_MAX_WORD_LENGTH:
      return (() => {
        let keys = find(state.keyboards, {'name': state.keyboardName}).keys;

        return assign({}, state, {
          learningMaxWordLength: action.maxWordLength,
          learningLesson: generateLesson(state.learningAlphabetSize, action.maxWordLength, keys),
        })
      })()

    default:
      return state;

  }
};