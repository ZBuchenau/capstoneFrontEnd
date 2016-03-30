app.service('accountData', ['$http','localStorageService', '$location', 'server', function($http, localStorageService, $location, server) {

  return {
    data: {},

    getAccountData: function(param) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log(this.data);

      return $http.post(server + '/users/analytics/accounts', param);

    },

    getCoreData: function(parameter) {
      return $http.post(server + '/users/analytics/coredata', parameter);
    },

    chartData: [],

    getIndustryData: function(parameter) {
      return $http.post(server + '/users/analytics/industrydata', parameter);
    },

    industryData: [],

    token: ''

  };
}]);
