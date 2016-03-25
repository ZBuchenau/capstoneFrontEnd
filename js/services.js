app.service('accountData', ['$http', function($http) {

  return {
    data: {},

    getAccountData: function() {

      return $http.post('http://www.localhost:3000/users/analytics/accounts', this.data);

    },

    getCoreData: function(parameter){
        return $http.post('http://www.localhost:3000/users/analytics/coredata', parameter);
    }

  };
}]);
