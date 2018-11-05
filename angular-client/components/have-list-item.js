angular.module('app')
  .controller('HaveListItemCtrl', function HaveListItemCtrl(helperService) {
    this.removeBook = helperService.removeBook;
    console.log(this);
  })
  .component('haveListItem', {
    bindings: {
      book: '<',
      rembooks: '<',
    },
    controller: 'HaveListItemCtrl',
    templateUrl: '/templates/have-list-item.html',
  });
