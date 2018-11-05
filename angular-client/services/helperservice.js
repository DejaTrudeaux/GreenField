angular.module('app')
  .service('helperService', function helperService($http) {
    this.getMyBooks = () => $http({
      method: 'GET',
      url: '/books',
    }).then(response => response.data);

    this.removeBook = id => $http({
      method: 'post',
      url: '/rembooks',
      data: {
        id,
      },
    });
  });
