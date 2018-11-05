angular.module('app')
  .controller('SignupCtrl', function SignupCtrl($http) {
    // this.view = 'signup';
    this.changeview = (option) => {
      this.view = option;
    };
    this.signupUser = (email, username, password) => {
      $http({
        method: 'post',
        url: '/signup',
        data: { email, username, password },
      }).then((response) => {
        this.changeview('login');
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('signup', {
    bindings: {
      changeview: '<',
    },
    controller: 'SignupCtrl',
    templateUrl: '/templates/signup.html',
  });
