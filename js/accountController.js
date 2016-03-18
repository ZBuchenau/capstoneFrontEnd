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
  vm.account.details = '';

  //set up the JWT in local storage
  localStorageService.set('FiveWeightAnalytics', vm.account.token);

  vm.account.search = function() {

    vm.display = 'Awaiting Response...';
    console.log(localStorageService.get('FiveWeightAnalytics'));

    //makes the call to the backend which in turn, makes the call to the proper google endpoints.
    $http.get('http://www.localhost:3000/users/analytics')
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('hello');
      vm.account.details = response.data;
      vm.account.finder = webProperties(vm.account.details);
    }

      function onFailure(response) {
        console.log('goodbye');
        vm.display = response;
        console.log(response.data);
      }
  };
}
