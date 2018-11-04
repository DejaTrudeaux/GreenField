angular.module('app')
  .service('helperService', function helperService($http) {
    this.getMyBooks = (callback) => {
      $http({
        method: 'GET',
        url: '/books',
      })
        .then((books) => {
          callback(null, books);
        })
        .catch((err) => {
          callback(err, null);
        });
    };
    this.removeBook = (callback) => {
      $http({
        method: 'delete',
        url: '/books',
      })
        .then((books) => {
          callback(books);
        })
        .catch((err) => {
          callback(err);
        });
    };
  });
