class PageOneController {
  constructor(ReduxController, $scope, $state) {
    this.scope = $scope;
    this.state = $state;

    ReduxController(this, $scope, this.mapState, this.mapDispatch);

    $scope.logout = this.logout.bind(this);
  }

  logout() {
    this.state.go('login');
  }

  mapState(state) {
    const { auth } = state;
    return { auth };
  }

  mapDispatch(dispatch) {
  }
}

angular.module('app')
.controller('PageOneController', PageOneController);
