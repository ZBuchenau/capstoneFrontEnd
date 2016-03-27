app.controller('profileController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', profileController]);

function profileController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData, d3) {
  var vm = this;

  vm.show = false;

  vm.series = [];

  //========================================================================================
  // This is all the user data that will eventually be used in the graphs
  //========================================================================================
  vm.dataObject = accountData.data;
  chartData = [];
  vm.dates = [];
  vm.sessions = [[]];
  vm.users = [[]];
  vm.sessionsPerUser = [[]];
  vm.newSessions = [[]];
  vm.pageviews = [[]];
  vm.pagesPerSession = [[]];
  vm.atos = [[]];
  vm.bounceRate = [[]];


//========================================================================================
// Return all accounts our app has access to for that user.
//========================================================================================
  vm.accounts = accountData.getAccountData(vm.dataObject).then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log(response);
      vm.series = [response.data[0].account_name];
      console.log(vm.series);
      vm.allAccounts = response.data;
      return vm.allAccounts;
    }

    function onFailure(response) {
      console.log('There was an error in your request...');
    }


//=========================================================================================
// Making a request to the server to return 30 days worth of data for the selected account.
// On success, loop through the response, and push all items into their respective arrays.
//=========================================================================================
  vm.coreData = function(param){
    // console.log(param);
    accountData.getCoreData(param).then(success, failure);

      function success(response) {
        chartData.push(response.data);
        vm.seriesOne = vm.site.account_name;
        console.log('This is the chart data: ', chartData[0]);
        vm.show = true;
        var graphData = chartData[0];

        for(var i = 0; i < graphData.length; i++){
            vm.dates.push(graphData[i].date);
            vm.sessions[0].push(graphData[i].sessions);
            vm.users[0].push(graphData[i].users);
            vm.sessionsPerUser[0].push(graphData[i].sessions_per_user);
            vm.pageviews[0].push(graphData[i].pageviews);
            vm.pagesPerSession[0].push(graphData[i].pages_per_session);
            vm.atos[0].push(graphData[i].atos);
            vm.bounceRate[0].push(graphData[i].bounce_rate);
            vm.newSessions[0].push(graphData[i].new_sessions);
          }
        }

      function failure(response) {
        console.log('ERROR');
      }
  };







}
