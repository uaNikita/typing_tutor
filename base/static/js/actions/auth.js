export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST'
export const RECEIVE_LOGIN_ANSWER = 'RECEIVE_LOGIN_ANSWER'
export const SEND_REG_REQUEST = 'SEND_REG_REQUEST'
export const RECEIVE_REG_ANSWER = 'SEND_REG_REQUEST'
export const SEND_PASS_RESET_REQUEST = 'SEND_REG_REQUEST'
export const RECEIVE_PASS_RESET_ANSWER = 'SEND_REG_REQUEST'

function sendLoginRequest(login, pass) {
  return {
    type: SEND_LOGIN_REQUEST,
    login,
    pass
  };
}

receiveLoginAnswer = (success, errors) => {
  return {
    type: RECEIVE_LOGIN_ANSWER,
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
