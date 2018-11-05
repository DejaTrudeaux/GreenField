angular.module('app')
  .controller('AppCtrl', function AppCtrl($http) {
    this.view = 'login';
    this.changeview = (option) => {
      this.view = option;
    };
    // attempt to get user to not have to log in on refresh
    // $http({
    //   method: 'get',
    //   url: '/',
    // }).then((response) => {
    //   if (response.data.bool) {
    //     this.changeview('search-bar');
    //   }
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
