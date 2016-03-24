app.controller('accountController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', accountController]);

function accountController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData) {
  var vm = this;

  // var dataGetter = function(dataName, param1, param2){
  //   var dataToUse = param1;
  //   for (var i = 0; i < dataName.length; i++) {
  //     console.log(dataName[i].param2);
  //     vm.dataName.push(dataName[i].param2);
  //   }
  // };


  vm.industries = [];
  vm.regions = [];
  vm.budgets = [];

//**********************************************************************************************************

  //ultimate goal of this controller/page, is to post an array of objects to the server that looks like this:

  //data: [
  // {id:12345, name:example.com, industry_id:4, region_id:4, budget_range_id: 3},
  // {id:15432, name:anotherexample.com, industry_id:3, region_id:4, budget_range_id: 2}
  // ];

//**********************************************************************************************************

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

  $http.get('http://www.localhost:3000/data')
    .then(dataSuccess, dataFailure)
    .catch(function(err){
      console.log('error');
    });

    function dataSuccess(response){
      console.log(response);

      var allData = response.data;

      function budgetData(){
        console.log(allData.budgets);
        var budgets = allData.budgets;
        for (var i = 0; i < budgets.length; i++) {
          vm.budgets.push(budgets[i]);
        }
      }

      function industriesData(){
        console.log(allData.industries);
        var industry = allData.industries;
        for (var j = 0; j < industry.length; j++) {
          vm.industries.push(industry[j]);
        }
      }

      function regionsData(){
        console.log(allData.regions);
        var region = allData.regions;
        for (var c = 0; c < region.length; c++) {
          vm.regions.push(region[c]);
        }
      }

      budgetData();
      industriesData();
      regionsData();

    }



    function dataFailure(response){
      console.log('Data request failed!');
    }

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
          accountData.accountData = vm.sites;
          console.log('POST REQUEST COMPLETED!');
          console.log(vm.sites);
          $location.path('/user/profile');
        }

        function failure(response){
          console.log('POST REQUEST FAILED!');
        }

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
