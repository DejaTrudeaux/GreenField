angular.module('app')
  .controller('LoginCtrl', function LoginCtrl() {
    this.loginSubmit = () => {
      console.log('button clicked');
    };
  })
  .component('login', {
    bindings: {
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });
