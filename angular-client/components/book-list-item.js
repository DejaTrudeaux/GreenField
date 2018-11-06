angular.module('app')
  .controller('BookListItemCtrl', function BookListItemCtrl() {
    // when user email is clicked, reroute to gmail
    this.clickEmail = () => {
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
