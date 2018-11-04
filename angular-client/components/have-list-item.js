angular.module('app')
  .controller('HaveListItemCtrl', function HaveListItemCtrl() {
  })
  .component('haveListItem', {
    bindings: {
      book: '<',
    },
    controller: 'HaveListItemCtrl',
    templateUrl: '/templates/have-list-item.html',
  });
