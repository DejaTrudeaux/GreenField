angular.module('app')
  .service('helperService', function helperService($http) {
    this.getMyBooks = () => $http({
      method: 'GET',
      url: '/books',
    }).then(response => response.data);

    // post method instead of delete because we are deleting based on an id
    this.removeBook = id => $http({
      method: 'post',
      url: '/rembooks',
      data: {
        id,
      },
    });
  });
