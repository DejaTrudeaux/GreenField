angular.module('app')
  .controller('AppCtrl', ($http) => {
    // $http.get('/login').then((response) => {
    //   console.log(response);
    // }).catch((err) => {
    //   console.log(err);
    // });
  })
  .component('app', {
    bindings: {
    },
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html',
  });
