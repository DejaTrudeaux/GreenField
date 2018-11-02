angular.module('app')
  .controller('SearchBarCtrl', () => {
    this.view = 'search-bar';
  })
  .component('searchBar', {
    bindings: {
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html',
  });
