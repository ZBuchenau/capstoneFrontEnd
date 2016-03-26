app.service('accountData', ['$http', function($http) {

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

    chartData: []
  };
}]);
