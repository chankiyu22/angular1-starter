class ConfigController {
  constructor($scope, config) {
    this.scope = $scope;

    $scope.config = config;
  }
}

angular.module('app')
.controller('ConfigController', ConfigController);
