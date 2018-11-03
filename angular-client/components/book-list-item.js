angular.module('app')
  .controller('BookListItemCtrl', function BookListItemCtrl() {

  })
  .component('bookListItem', {
    bindings: {
      book: '<',
    },
    controller: 'BookListItemCtrl',
    templateUrl: '/templates/book-list-item.html',
  });
