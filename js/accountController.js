app.controller('accountController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', accountController]);

function accountController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData) {
  var vm = this;

  vm.accountSubmit = false;
  vm.submitted = false;

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


  $http.get('http://www.localhost:3000/data')
    .then(dataSuccess, dataFailure)
    .catch(function(err) {
      console.log('error');
    });

  function dataSuccess(response) {
    // console.log(response);

    var allData = response.data;

    function budgetData() {
      var budgets = allData.budgets;
      for (var i = 0; i < budgets.length; i++) {
        vm.budgets.push(budgets[i]);
      }
    }

    function industriesData() {
      var industry = allData.industries;
      for (var j = 0; j < industry.length; j++) {
        vm.industries.push(industry[j]);
      }
    }

    function regionsData() {
      var region = allData.regions;
      for (var c = 0; c < region.length; c++) {
        vm.regions.push(region[c]);
      }
    }

    budgetData();
    industriesData();
    regionsData();

  }



  function dataFailure(response) {
    console.log('Data request failed!');
  }

  vm.account = {};
  vm.account.token = $routeParams.token;
  vm.account.ids = [];
  vm.account.industry = [];

  //set up the JWT in local storage
  localStorageService.set('FiveWeightAnalytics', vm.account.token);

  vm.account.search = function() {

    //makes the call to the backend which in turn, makes the call to the proper google endpoints.
    $http.get('http://www.localhost:3000/users/analytics')
      .then(onSuccess, onFailure);
    // ============================================================
    function onSuccess(response) {

      vm.account.details = response.data;
      console.log(vm.account.details);

      vm.account.finder = function() {
        var properties = [];
        var accountId;
        var accountName;
        var url;

        for (var i = 0; i < vm.account.details.length; i++) {
          accountId = vm.account.details[i].id;
          accountName = vm.account.details[i].name;

          var obj = vm.account.details[i].webProperties;
          for (var j = 0; j < obj.length; j++) {

            var arr = obj[j].profiles;
            url = obj[j].websiteUrl.replace('http://', '');

            for (var k = 0; k < arr.length; k++) {

              properties.push({
                id: arr[k].id,
                name: arr[k].name,
                accountId: accountId,
                accountName: accountName,
                url: url
              });
            }
          }
        }
        console.log(properties);

        return properties;
      };

      vm.account.properties = vm.account.finder();

      vm.account.approved = vm.account.ids;
      vm.account.approved.industry = {};


      vm.submitAccountsForm = function() {

        $http.post('http://www.localhost:3000/users/analytics', {
            id: $window.atob(localStorage.getItem('ls.FiveWeightAnalytics').split('.')[1]),
            data: vm.sites
          })
          .then(success, failure);

        function success(response) {
          accountData.data = vm.sites;
          console.log('POST REQUEST COMPLETED!');
          console.log(vm.sites);
          $location.path('/user/profile');
          vm.accountSubmit = true;
        }

        function failure(response) {
          console.log('POST REQUEST FAILED!');
        }

      };

      vm.accountSubmit = true;

    }
    // ============================================================

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
