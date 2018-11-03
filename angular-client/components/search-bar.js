angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl($http) {
    this.view = 'search-bar';
    this.searchbooks = (searchterm) => {
      $http({
        method: 'get',
        url: `/isbn/'${searchterm}'`,
      }).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    };
  })
  .component('searchBar', {
    bindings: {
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html',
  });
