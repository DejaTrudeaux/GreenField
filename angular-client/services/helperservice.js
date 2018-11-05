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
    this.removeBook = (id) => {
      $http({
        method: 'post',
        url: '/rembooks',
        data: {
          rowId: id,
        },
      }).then((books) => {
        console.log(null, books);
      })
        .catch((err) => {
          console.log(err, null);
        });
    };
  });
