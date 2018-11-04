angular.module('app')
  .controller('BookListItemCtrl', function BookListItemCtrl() {
    this.clickEmail = (email) => {
      console.log(email);
    };
  })
  .component('bookListItem', {
    bindings: {
      book: '<',
    },
    controller: 'BookListItemCtrl',
    templateUrl: '/templates/book-list-item.html',
  });
