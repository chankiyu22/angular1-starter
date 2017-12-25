angular.module('app')
.factory('auth', (LoginAction) => {
  const initialState = {
    'login': {
      'requesting': false,
      'success': false,
      'error': null,
    },
    'user': null,
  };

  const actionMap = {
    [LoginAction.REQUESTING]: (state, action) => {
      return {...state,
        'login': {...state.login,
          'requesting': true,
          'success': false,
          'error': null,
        },
      };
    },
    [LoginAction.SUCCESS]: (state, action) => {
      return {...state,
        'login': {...state.login,
          'requesting': false,
          'success': true,
        },
        'user': action.user,
      };
    },
    [LoginAction.FAILED]: (state, action) => {
      return {...state,
        'login': {...state.login,
          'requesting': false,
          'error': action.error,
        },
      };
    },
  };

  return (state = initialState, action) => {
    const handler = actionMap[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  }
});
