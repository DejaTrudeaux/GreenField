angular.module('app')
  .controller('BookListItemCtrl', function BookListItemCtrl(helperService) {
    // helperService.checkUser((this.users.username, this.users.password));
    this.hello = 'hello';
  })
  .component('bookListItem', {
    bindings: {
    },
    controller: 'BookListItemCtrl',
    templateUrl: '/templates/book-list-item.html',
  });
