app.controller('profileController', ['$scope', '$http', '$route', '$routeParams', '$location', '$window', 'localStorageService', 'accountData', 'server', profileController]);

function profileController($scope, $http, $route, $routeParams, $location, $window, localStorageService, accountData, server) {
  var vm = this;
  // accountData.getAccountData().then(function(response){
    //use this response to populate the dropdown
  // });
  vm.show = false;
  vm.site = {};

  vm.id = {
    token: localStorageService.get('FiveWeightAnalytics')
  };
  // vm.series = [vm.site, "Industry Average"];

  //========================================================================================
  // This is all the user data that will eventually be used in the graphs
  //========================================================================================
  vm.dataObject = accountData.data;

  chartData = [];
  vm.dates = [];
  vm.sessions = [[],[]];
  vm.users = [[],[]];
  vm.sessionsPerUser = [[],[]];
  vm.newSessions = [[],[]];
  vm.pageviews = [[],[]];
  vm.pagesPerSession = [[],[]];
  vm.atos = [[],[]];
  vm.bounceRate = [[],[]];


  //========================================================================================
  // Return all accounts our app has access to for that user.
  //========================================================================================
  accountData.getAccountData(vm.id).then(onSuccess, onFailure);

  function onSuccess(response) {

    vm.allAccounts = response.data;
    accountData.allAccounts = response.data;

    return accountData.allAccounts;
  }

  function onFailure(response) {
    console.log('There was an error in your request...');
  }


  //=========================================================================================
  // Making a request to the server to return 30 days worth of data for the selected account.
  // On success, loop through the response, and push all items into their respective arrays.
  //                          ********************************
  //Then, make a request to the server to return the average data for that I.R.B, as well as,
  //what budget range,
  //=========================================================================================



  vm.coreData = function(param) {

    chartData = [];
    vm.series = [];
    vm.dates = [];
    vm.sessions = [[],[]];
    vm.users = [[],[]];
    vm.sessionsPerUser = [[],[]];
    vm.newSessions = [[],[]];
    vm.pageviews = [[],[]];
    vm.pagesPerSession = [[],[]];
    vm.atos = [[],[]];
    vm.bounceRate = [[],[]];

    accountData.getCoreData(param).then(success, failure);

    function success(response) {

      chartData.push(response.data);
      vm.series = [];
      // console.log(vm.series);
      console.log('This is the chart data: ', chartData[0]);
      vm.show = true;
      var graphData = chartData[0];
      vm.series = [JSON.parse(vm.site).account_name, "Industry"];

      for (var i = 0; i < graphData.length; i++) {
        var dateNumbers = graphData[i].date;
        var date = dateNumbers.toString();
        var year = date.substring(0, 4);
        var month = date.substring(4, 6);
        var day = date.substring(6, 8);
        var actualDate = month + "/" + day + "/" + year;

        vm.dates.push(actualDate);
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

  vm.industryData = function(param){

    accountData.getIndustryData(param).then(succ, fail);

    function succ(response){
      console.log('Industry Data Response: ');
      console.log(response.data);

      for(var i = 0; i < 30; i++){
        vm.sessions[1].push(response.data.sessions);
        vm.users[1].push(response.data.users);
        vm.sessionsPerUser[1].push(response.data.sessionsPerUser);
        vm.pageviews[1].push(response.data.pageviews);
        vm.pagesPerSession[1].push(response.data.pagesPerSession);
        vm.atos[1].push(response.data.atos);
        vm.bounceRate[1].push(response.data.bounceRate);
        vm.newSessions[1].push(response.data.newSessions);
      }
    }

    function fail(response){
      console.log('Failed Industry Data Response');
    }
  };

}
