angular.module('app')
  .controller('HaveListItemCtrl', function HaveListItemCtrl(helperService) {
    this.removeBook = helperService.removeBook;
    
  })
  .component('haveListItem', {
    bindings: {
      book: '<',
    },
    controller: 'HaveListItemCtrl',
    templateUrl: '/templates/have-list-item.html',
  });
