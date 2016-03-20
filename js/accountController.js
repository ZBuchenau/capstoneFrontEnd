app.controller('accountController', ['$scope', '$http', '$route', '$routeParams', '$location', 'localStorageService', accountController]);

function accountController($scope, $http, $route, $routeParams, $location, localStorageService) {
  var vm = this;

  var webProperties = function(data) {
    var properties = [];
    for (var i = 0; i < data.length; i++) {
      properties.push({
        id: data[i].name,
        name: data[i].id
      });
    }
    return properties;
  };

  vm.account = {};
  vm.account.token = $routeParams.token;
  // vm.account.details = '';
  // vm.account.data = '';
  // vm.account.names = {};
  vm.account.ids = [];

  //set up the JWT in local storage
  localStorageService.set('FiveWeightAnalytics', vm.account.token);

  vm.account.search = function() {

    //makes the call to the backend which in turn, makes the call to the proper google endpoints.
    $http.get('http://www.localhost:3000/users/analytics')
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('hello');
      vm.account.details = response.data;
      vm.account.finder = webProperties(vm.account.details);



      vm.submitAccountsForm = function(){
        vm.account.approved = {};
        vm.account.approved.push(vm.account.ids);
      };


      vm.checkAll = function(){
        vm.account.ids = angular.copy('vm.account.finder');
      };

      vm.uncheckAll = function(){
        vm.account.ids = [];
      };

    }

      function onFailure(response) {
        console.log('goodbye');
        vm.display = response;
        console.log(response.data);
      }
  };

vm.account.data = '';

  vm.account.data = function() {

    //makes the call to the backend which in turn, makes the call to the proper google endpoints.
    $http.get('http://www.localhost:3000/users/analytics/coredata')
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('SUCCESS!');
      vm.account.data = response.data;
      console.log(response);
    }

      function onFailure(response) {
        console.log('NOPE!!!!');
        // vm.display = response;
      console.log(response.data);
      }
  };
}
