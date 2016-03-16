app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/main.html',
    controller: 'mainController as mc'
  });
});
