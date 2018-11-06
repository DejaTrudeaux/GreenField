angular.module('app')
  .controller('SignupCtrl', function SignupCtrl($http) {
    this.signupUser = (email, username, password) => {
      $http({
        method: 'post',
        url: '/signup',
        data: { email, username, password },
      }).then(() => {
        // after someone signs up, change the view to login
        this.changeview('login');
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('signup', {
    bindings: {
      // changeview property
      changeview: '<',
    },
    controller: 'SignupCtrl',
    templateUrl: '/templates/signup.html',
  });
