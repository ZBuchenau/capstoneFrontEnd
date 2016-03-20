app.controller('homeController', ['$scope', '$log', '$http', '$route', 'localStorageService',  '$routeParams', '$location', homeController]);

function homeController($scope, $log, $http, $route, localStorageService, $routeParams, $location) {
  var vm = this;

  // $log.info($location.path);
  // var favoriteCookie = $cookies.get('connect.sid');
  vm.title = {};
  vm.title.name = 'Example of 2-way binding';

  // vm.title.cookie = favoriteCookie;

  vm.accounts = {};
  vm.accounts.search = function() {

    vm.display = 'Awaiting Response...';

    $http.get('http://www.localhost:3000/users/analytics', {
        withCredentials: true,
        headers: {
          xsrfCookieName: "connect.sid"
        }
      })
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
