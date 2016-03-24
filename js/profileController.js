app.controller('profileController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', profileController]);

function profileController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData) {
  var vm = this;

  vm.accounts = accountData.getAccountData().then(onSuccess, onFailure);

  function onSuccess(response) {
    // console.log(response);
    vm.allAccounts = response.data;
  }

  function onFailure(response) {
    console.log('There was an error in your request...');
  }


  vm.getAccountDataForm = function() {
    
  };



}
