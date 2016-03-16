app.controller('mainController', ['$scope', '$http', '$cookies', '$route', mainController]);

function mainController($scope, $http, $cookies, localStorageService, $routeParams) {
  var vm = this;
  // var favoriteCookie = $cookies.get('connect.sid');
  vm.title = {};
  vm.title.name = 'Example of 2-way binding';

  // vm.title.cookie = favoriteCookie;

  vm.accounts = {};
  vm.accounts.search = function() {

    vm.display = 'Awaiting Response...';

    $http.get('http://www.localhost:3000/users/analytics', {
        withCredentials: true,
        headers: {
          xsrfCookieName: "connect.sid"
        }
      })
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('hello');

      vm.display = response;
    }

    function onFailure(response) {
      console.log('goodbye');
      vm.display = response;
      console.log(response.data);
    }
  };

  vm.accounts.login = function(){
    vm.show = 'awaiting login...';

    $http.get("http://localhost:3000/auth/google", {
        withCredentials: true,
      })
      .then(onSuccess, onFailure);

    function onSuccess(response) {
      console.log('hello');
      vm.accounts.token = $routeParams.token;
      console.log(vm.accounts.token);
      //localStorageService.set('googleToken', response.data.token);

      vm.display = response;
    }

    function onFailure(response) {
      console.log('goodbye');
      vm.display = response;
      console.log(response.data);
    }
  };

}

// Given:
// URL: http://server.com/index.html#/Chapter/1/Section/2?search=moby
// Route: /Chapter/:chapterId/Section/:sectionId
//
// Then
//$routeParams ==> {chapterId:'1', sectionId:'2', search:'moby'}
