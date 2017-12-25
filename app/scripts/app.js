const thunk = window.ReduxThunk.default;

angular.module('app', [
  'ngRedux',
  'ui.router',
  'toastr',
  'ngAnimate',
])

.config(($ngReduxProvider, $stateProvider, $urlRouterProvider) => {
  $ngReduxProvider.createStoreWith({
    'auth': 'auth',
  }, [thunk]);

  $stateProvider.state({
    'name': 'login',
    'url': '/',
    'controller': 'LoginController',
    'templateUrl': 'views/login.html',
  })

  .state({
    'name': 'config',
    'url': '/config',
    'controller': 'ConfigController',
    'templateUrl': 'views/config.html',
  })

  .state({
    'name': 'page-one',
    'url': '/page-one',
    'controller': 'PageOneController',
    'templateUrl': 'views/page-one.html',
  })

  .state({
    'name': 'page-two',
    'url': '/page-two',
    'controller': 'PageTwoController',
    'templateUrl': 'views/page-two.html',
  });

  $urlRouterProvider.otherwise('/');
});
