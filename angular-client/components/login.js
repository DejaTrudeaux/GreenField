angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http, helperService) {
    this.checkUser = (username, password) => {
      $http({
        method: 'post',
        url: '/login',
        data: { username, password },
      }).then((response) => {
        if (response.data.bool) {
          this.changeview('search-bar');
        } else {
          this.changeview('signup');
        }
      }).catch((err) => {
        console.log(err);
      });

      // helperService.getMyBooks((err, books) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(books, 'BOOKS');
      //     this.myBooks = books;
      //   }
      // });
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
  })
  .component('login', {
    bindings: {
      changeview: '<',
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });
