import * as types from '../constants/action-types/auth';

function sendLoginRequest(login, pass) {
  return {
    type: types.SEND_LOGIN_REQUEST,
    login,
    pass
  };
}

let receiveLoginAnswer = (success, errors) => {
  return {
    type: types.RECEIVE_LOGIN_ANSWER,
    success,
    errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: (login, password) => {
      dispatch(sendLoginRequest(login, password))

      var request = $.ajax({
        url: 'login-url',
        method: 'POST',
        data: {
          login,
          password
        }
      });

      request.done(function (json) {

        var json = {
          success: true
        };

        var json = {
          error: 'Some error'
        };

        receiveLoginAnswer(json)
      });

      request.fail(function () {
        var json = {
          error: 'No server answer'
        };

        receiveLoginAnswer(json)
      });
    }
  }
}

