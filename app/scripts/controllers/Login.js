class LoginController {
  constructor(ReduxController, $scope, $state, LoginAction, toastr, config) {
    this.LoginAction = LoginAction;
    this.scope = $scope;
    this.state = $state;
    this.toastr = toastr;

    ReduxController(this, $scope, this.mapState, {
      LoginAction,
    });

    $scope.attempLogin = this.attempLogin.bind(this);
    $scope.config = config;
  }

  componentWillReceiveState(nextState) {
    this.componentWillReceiveLogin(nextState);
  }

  componentWillReceiveLogin(nextState) {
    const { error } = nextState.auth.login;
    if (error && error !== this.scope.auth.login.error) {
      this.toastr.error(error.message);
    }
  }

  componentDidReceiveState(prevState) {
    this.componentDidReceiveLogin(prevState);
  }

  componentDidReceiveLogin(prevState) {
    const { success } = this.scope.auth.login;
    if (success && !prevState.auth.login.success) {
      this.state.go('page-one');
    }
  }

  attempLogin(username, password) {
    this.scope.actions.LoginAction(username, password);
  }

  mapState(state) {
    const { auth } = state;
    return { auth };
  }
}

angular.module('app')
.controller('LoginController', LoginController);
