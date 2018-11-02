angular.module('app')
  .controller('AppCtrl', function AppCtrl() {
    this.view = 'login';
    this.changeview = (option) => {
      this.view = option;
    };
  })
  .component('app', {
    bindings: {
    },
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
