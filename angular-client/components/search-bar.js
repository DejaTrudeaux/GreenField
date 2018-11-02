angular.module('app')
  .controller('SearchBarCtrl', function SearchBarCtrl() {
    this.view = 'search-bar';
    this.searchbooks = (searchterm) => {
      console.log(searchterm);
    };
  })
  .component('searchBar', {
    bindings: {
    },
    controller: 'SearchBarCtrl',
    templateUrl: '/templates/search-bar.html',
  });
