angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http) {
    this.checkUser = (username, password) => {
      console.log('checking user');
      $http({
        method: 'get',
        url: '/login',
      }).then((session) => {
        console.log(session, 'session');
        session.username = username;
        session.password = password;
      });
    };
  })
  .component('login', {
    bindings: {
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });
