angular.module('app')
  .controller('BookListCtrl', function BookListCtrl() {
  })
  .component('bookList', {
    bindings: {
      booklist: '<',
    },
    controller: 'BookListCtrl',
    templateUrl: '/templates/book-list.html',
  });
