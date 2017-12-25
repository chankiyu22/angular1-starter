class PageTwoController {
  constructor(ReduxController, $scope) {
    this.scope = $scope;

    ReduxController(this, $scope, this.mapState, this.mapDispatch.bind(this));

    $scope.count = 100;
  }

  mapState(state) {
    return {};
  }

  mapDispatch(dispatch) {
    this.dispatch = dispatch;
    return {};
  }
}

angular.module('app')
.controller('PageTwoController', PageTwoController);
