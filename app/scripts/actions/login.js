angular.module('app')
.factory('LoginAction', () => {
  function loginAction(username, password) {
    return (dispatch) => {
      dispatch({
        'type': loginAction.REQUESTING,
      });

      setTimeout(() => {
        if (username === 'example' && password === 'password') {
          dispatch({
            'type': loginAction.SUCCESS,
            'user': {
              'name': 'Some Example Name',
              'gender': 'male',
            },
          });
        } else {
          dispatch({
            'type': loginAction.FAILED,
            'error': {
              'message': 'Wrong User Name or Password',
            },
          });
        }
      }, 2000);
    }
  }

  loginAction.REQUESTING = 'LOGIN/REQUESTING';
  loginAction.SUCCESS = 'LOGIN/SUCCESS';
  loginAction.FAILED = 'LOGIN/FAILED';

  return loginAction;
});
