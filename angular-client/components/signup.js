angular.module('app')
  .controller('SignupCtrl', () => {
    this.view = 'signup';
  })
  .component('signup', {
    bindings: {
    },
    controller: 'SignupCtrl',
    templateUrl: '/templates/signup.html',
  });
