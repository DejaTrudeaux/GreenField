angular.module('app')
  .controller('LoginCtrl', function LoginCtrl($http) {
    this.checkUser = () => {
      console.log('checking user');
      $http({
        method: 'post',
        url: '/login',
      }).then(() => {});
    };
  })
  .component('login', {
    bindings: {
    },
    controller: 'LoginCtrl',
    templateUrl: '/templates/login.html',
  });

// $(document).ready(() => {
//   var email, pass;
//   $("#submit").click(function () {
//     email = $("#email").val();
//     pass = $("#password").val();
//     /*
//     * Perform some validation here.
//     */
//     $.post("http://localhost:3000/login", { email: email, pass: pass }, function (data) {
//       if (data === 'done') {
//         window.location.href = "/admin";
//       }
//     });
//   })}
