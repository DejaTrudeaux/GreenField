angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http) {
    // post request to check username and password
    this.checkUser = (username, password) => {
      $http({
        method: 'post',
        url: '/login',
        data: { username, password },
      }).then((response) => {
        // if user is logged in, (bool is true)
        if (response.data.bool) {
          // change view to search bar
          this.changeview('search-bar');
        } else {
          // if not, send them to signup
          this.changeview('signup');
        }
      }).catch((err) => {
        console.log(err);
      });
    };

    this.signupUser = (email, username, password) => {
      // user post request needs an email, username, and password
      $http({
        method: 'post',
        url: '/signup',
        data: { email, username, password },
      }).then((response) => {
        console.log(response);
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
