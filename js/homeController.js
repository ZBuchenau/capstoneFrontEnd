app.controller('homeController', ['$scope', '$log', '$http', '$route', 'localStorageService', '$routeParams', '$location', 'server', homeController]);

function homeController($scope, $log, $http, $route, localStorageService, $routeParams, $location, server) {
  var vm = this;

  // localStorageService.clearAll();

  vm.title = {};

  vm.accounts = {};
  vm.accounts.search = function() {

    vm.display = 'Awaiting Response...';

    $http.get(server + '/users/analytics')
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('hello');

      vm.display = response;
    }

    function onFailure(response) {
      console.log('goodbye');
      vm.display = response;
      console.log(response.data);
    }
  };

}
