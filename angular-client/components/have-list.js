angular.module('app')
  .controller('HaveListCtrl', function HaveListCtrl() {
  })
  .component('haveList', {
    bindings: {
      mybooks: '<',
      rembooks: '<',
    },
    controller: 'HaveListCtrl',
    templateUrl: '/templates/have-list.html',
  });
