app.config(function ($httpProvider, ChartJsProvider) {
  $httpProvider.interceptors.push('authInterceptor');

  ChartJsProvider.setOptions({ colours : [ '#FF6929', '#383838'] });
});
