app.controller('accountController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', accountController]);

function accountController($scope, $http, $route, $routeParams, $location, $window, localStorageService) {
  var vm = this;

//**********************************************************************************************************

  //ultimate goal of this controller/page, is to post an array of objects to the server that looks like this:

  //data: [
  // {id:12345, name:example.com, industry_id:4, region_id:4, budget_range_id: 3},
  // {id:15432, name:anotherexample.com, industry_id:3, region_id:4, budget_range_id: 2}
  // ];

//**********************************************************************************************************


  vm.industries = [{
    id: 1,
    name: "New Home Builder"
  },
  {
    id: 2,
    name: "Real Estate Developer"
  },
  {
    id: 3,
    name: "Real Estate Builder"
  },
  {
    id: 4,
    name: "Interior Design"
  }];

  vm.regions = [{
    id: 1,
    name: "Colorado"
  },
  {
    id: 2,
    name: "Utah"
  },
  {
    id: 3,
    name: "Nevada"
  },
  {
    id: 4,
    name: "California"
  }];

  vm.budgets = [{
    id: 1,
    name: "$0 - $1,000"
  },
  {
    id: 2,
    name: "$1,001 - $3,500"
  },
  {
    id: 3,
    name: "$3,501 - $5,000"
  },
  {
    id: 4,
    name: "$5,000+"
  }];





  var webProperties = function(data) {
    var properties = [];
    for (var i = 0; i < data.length; i++) {
      properties.push({
        name: data[i].name,
        id: data[i].id
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
  vm.account.industry = [];

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

      vm.account.approved = vm.account.ids;

      vm.account.approved.industry = {};


      vm.submitAccountsForm = function(){

        $http.post('http://www.localhost:3000/users/analytics', {
          id: $window.atob(localStorage.getItem('ls.FiveWeightAnalytics').split('.')[1]),
          data: vm.sites
        })
          .then(success, failure);

        function success(response){
          console.log('POST REQUEST COMPLETED!');
        }

        function failure(response){
          console.log('POST REQUEST FAILED!');
        }

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
