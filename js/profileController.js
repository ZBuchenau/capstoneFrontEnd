app.controller('profileController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', profileController]);

function profileController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData) {
  var vm = this;

//========================================================================================
// Return all accounts our app has access to for that user.
//========================================================================================
  vm.accounts = accountData.getAccountData().then(onSuccess, onFailure);

    function onSuccess(response) {
      vm.allAccounts = response.data;
    }

    function onFailure(response) {
      console.log('There was an error in your request...');
    }


//=========================================================================================
// Making a request to the server to return 30 days worth of data for the selected account.
//=========================================================================================
  vm.coreData = function(param){
    console.log(param);
    accountData.getCoreData(param).then(success, failure);

      function success(response) {
        console.log(response);
      }

      function failure(response) {
        console.log('ERROR');
      }
  };

}
