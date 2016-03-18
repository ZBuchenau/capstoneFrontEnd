app.factory('authInterceptor', function ($rootScope, $q, $window, localStorageService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorageService.get('FiveWeightAnalytics')) {
        config.headers.Authorization = 'Bearer ' + localStorageService.get('FiveWeightAnalytics');
      }
      console.log(config.headers.Authorization + "Hey I'm here!!!!!!!!!");
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    }
  };
});
