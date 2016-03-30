app.service('accountData', ['$http','localStorageService', '$location', function($http, localStorageService, $location) {

  return {
    data: {},

    getAccountData: function(param) {
      console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
      console.log(this.data);

      return $http.post('http://www.localhost:3000/users/analytics/accounts', param);

    },

    getCoreData: function(parameter) {
      return $http.post('http://www.localhost:3000/users/analytics/coredata', parameter);
    },

    chartData: [],

    getIndustryData: function(parameter) {
      return $http.post('http://www.localHost:3000/users/analytics/industrydata', parameter);
    },

    industryData: [],

    token: ''

  };
}]);
