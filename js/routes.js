app.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    //this is the homepage, where the user will click to login through google
    templateUrl: '../views/main.html',
    controller: 'homeController as hc'
  })
  .when('/user/profile/:token', {
    // this is the profile page, where the token will be set in local storage,
    // and the user will select which web properties within their analytics account we will load to our database,
    // which industry they are a part of,
    // and other relevant information to their account will be deposited to the database.
    // After they submit this form, they will be redirected to the views page, where they will be able to view the
    // D3 visualizations for their accounts against industry standards.
    templateUrl: '../views/login.html',
    controller: 'accountController as ac'
  })
  .when('/user/profile/', {
    // this is the page where the user will be able to see their accounts, and select which ones they will pull data for.
    // When they pull the data, the graphs will show up below the select accounts button.
    templateUrl: '../views/profile.html',
    controller: 'profileController as pc'
  })
  .when('/user/logout', {
    templateUrl: '../views/logout.html',
    controller: 'logoutController as lc'
  });

});
