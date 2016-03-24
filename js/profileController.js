app.controller('profileController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', profileController]);

function profileController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData) {
  var vm = this;

  vm.accounts = accountData.accountData;

  vm.getAccounts = function() {
    $http.post('http://www.localhost:3000/users/analytics/accounts', vm.accounts)
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log(response);
    }

    function onFailure(response) {
      console.log('There was an error in your request...');
    }

  };
}
