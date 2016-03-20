app.controller('logoutController', ['$scope', '$log', '$http', '$route', 'localStorageService', '$window', '$location', logoutController]);

function logoutController($scope, $log, $http, $route, localStorageService, $window, $location){
  var vm = this;

  vm.logout = localStorageService.remove('FiveWeightAnalytics');
}
