angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http) {
    this.checkUser = (username, password) => {
      $http({
        method: 'post',
        url: '/login',
        data: { username, password },
      }).then((response) => {
        if (response.data.bool) {
          this.changeview('search-bar');
        }
        // else {
        //   this.changeview('signup');
        // }
      }).catch((err) => {
        console.log(err);
      });
    };
    this.signupUser = (email, username, password) => {
      $http({
        method: 'post',
        url: '/signup',
        data: { email, username, password },
      }).then((response) => {
        console.log(response, 'LOGINJS SIGNUPUSER RESPONSE');
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('login', {
    bindings: {
      changeview: '<',
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });
