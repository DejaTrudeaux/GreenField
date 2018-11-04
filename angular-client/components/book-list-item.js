angular.module('app')
  .controller('BookListItemCtrl', function BookListItemCtrl() {
    this.clickEmail = (email) => {
      window.location.href = 'https://www.gmail.com';
    };
  })
  .component('bookListItem', {
    bindings: {
      book: '<',
    },
    controller: 'BookListItemCtrl',
    templateUrl: '/templates/book-list-item.html',
  });
