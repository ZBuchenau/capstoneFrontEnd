app.controller('mainController', ['$scope', '$http', '$cookies', mainController]);

function mainController($scope, $http, $cookies) {
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
        // headers: {
        //   xsrfCookieName: "connect.sid"
        // }
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
      vm.display = response;
    }

    function onFailure(response) {
      console.log('goodbye');
      vm.display = response;
      console.log(response.data);
    }
  };

}
