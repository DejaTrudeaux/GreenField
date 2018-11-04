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
  });
