angular.module('app')
  .controller('SignupCtrl', function SignupCtrl() {
    this.view = 'signup';
  })
  .component('signup', {
    bindings: {
    },
    controller: 'SignupCtrl',
    templateUrl: '/templates/signup.html',
  });
