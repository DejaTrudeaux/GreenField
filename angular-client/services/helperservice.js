angular.module('app')
  .service('helperService', function helperService($http) {
    this.checkUser = (username, password) => {
      $http({
        method: 'post',
        url: '/login',
        data: { username, password },
      }).then((response) => {
        if (response.data.bool) {
          this.changeview('search-bar');
        }
        // else {
        //   this.changeview('signup');
        // }
      }).catch((err) => {
        console.log(err);
      });
    };
    this.signupUser = (email, username, password) => {
      $http({
        method: 'post',
        url: '/signup',
        data: { email, username, password },
      }).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
    };
  });
