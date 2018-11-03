angular.module('app')
  .controller('BookListCtrl', function BookListCtrl() {
  })
  .component('bookList', {
    bindings: {
    },
    controller: 'BookListCtrl',
    templateUrl: '/templates/book-list.html',
  });
