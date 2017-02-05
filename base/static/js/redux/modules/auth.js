import { forEach, assign } from 'lodash';

const SEND_LOGIN_REQUEST = 'auth/SEND_LOGIN_REQUEST';
const RECEIVE_LOGIN_ANSWER = 'auth/RECEIVE_LOGIN_ANSWER';
const SEND_REGISTRATION_REQUEST = 'auth/SEND_REGISTRATION_REQUEST';
const RECEIVE_REGISTRATION_ANSWER = 'auth/RECEIVE_REGISTRATION_ANSWER';
const SEND_PASSWORD_RESET_REQUEST = 'auth/SEND_PASSWORD_RESET_REQUEST';
const RECEIVE_PASSWORD_RESET_ANSWER = 'auth/RECEIVE_PASSWORD_RESET_ANSWER';
const OPEN_MODAL = 'auth/OPEN_MODAL';
const CLOSE_MODAL = 'auth/CLOSE_MODAL';

const INITIAL_STATE = {
  email: '',
  loginLoading: false,
  regLoading: false
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {

    case SEND_LOGIN_REQUEST:
       return assign({}, state);

    case RECEIVE_LOGIN_ANSWER:
      return assign({}, state, {
        keyboardName: action.name
      });

    default:
      return state;
  }
};

function sendLoginRequest(login, pass) {
  return {
    type: SEND_LOGIN_REQUEST,
    login,
    pass
  };
}

let receiveLoginAnswer = (success, errors) => {
  return {
    type: RECEIVE_LOGIN_ANSWER,
    success,
    errors
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchLogin: (login, password) => {
//       dispatch(sendLoginRequest(login, password))
//
//       var request = $.ajax({
//         url: 'login-url',
//         method: 'POST',
//         data: {
//           login,
//           password
//         }
//       });
//
//       request.done(function (json) {
//
//         var json = {
//           success: true
//         };
//
//         var json = {
//           error: 'Some error'
//         };
//
//         receiveLoginAnswer(json)
//       });
//
//       request.fail(function () {
//         var json = {
//           error: 'No server answer'
//         };
//
//         receiveLoginAnswer(json)
//       });
//     }
//   }
// }

