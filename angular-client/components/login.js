angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http) {
    this.checkUser = (username, password) => {
      $http({
        method: 'post',
        url: '/login',
        data: { username, password },
      }).then((response) => {
        console.log(response, 'RESPONSE CLIENT!');
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('login', {
    bindings: {
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });
