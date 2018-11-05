angular.module('app')
  .service('helperService', function helperService($http) {
    this.getMyBooks = (callback) => {
      $http({
        method: 'GET',
        url: '/books',
      })
        .then((books) => {
          callback(books);
        })
        .catch((err) => {
          callback(err);
        });
    };
    this.removeBook = (id) => {
      $http({
        method: 'post',
        url: '/rembooks',
        data: {
          rowId: id,
        },
      });
    };
  });
