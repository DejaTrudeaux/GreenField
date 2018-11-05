angular.module('app')
  .controller('HaveListCtrl', function HaveListCtrl(helperService) {
    this.bookArr = [];
    helperService.getMyBooks((res) => {
      this.bookArr = res.data;
    });
    
  })
  .component('haveList', {
    bindings: {
      // mybooks: '<',
      rembooks: '<',
    },
    controller: 'HaveListCtrl',
    templateUrl: '/templates/have-list.html',
  });
