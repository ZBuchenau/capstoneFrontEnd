app.controller('logoutController', ['$scope', '$log', '$http', '$route', 'localStorageService', '$window', '$location', 'server',logoutController]);

function logoutController($scope, $log, $http, $route, localStorageService, $window, $location, server){
  var vm = this;

  vm.logout = localStorageService.remove('FiveWeightAnalytics');
}
