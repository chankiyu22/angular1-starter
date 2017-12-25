angular.module('app')
.factory('ReduxController', ($ngRedux) => {
  return (controller, scope, mapState, mapDispatch) => {
    const unsubscribe = $ngRedux.connect(
      mapState, mapDispatch
    )((state, actions) => {
      scope.actions = actions;

      angular.forEach(state, (s, key) => {
        if (!scope[key]) {
          scope[key] = s;
        }
      });

      if (controller.componentWillReceiveState) {
        controller.componentWillReceiveState(state);
      }

      const prevState = {};

      angular.forEach(state, (s, key) => {
        prevState[key] = scope[key];
        scope[key] = s;
      });

      if (controller.componentDidReceiveState) {
        controller.componentDidReceiveState(prevState);
      }
    });

    scope.$on('$destroy', unsubscribe);
  };
});
