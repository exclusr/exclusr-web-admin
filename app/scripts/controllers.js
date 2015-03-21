'use strict';

angular
  .module('exclusrWeb')
  // .controller('SigninController', [
  //   '$rootScope',
  //   '$scope',
  //   '$location',
  //   '$localStorage',
  //   'UserService',
  //   'SERVER_API_URL',
  //   function ($rootScope, $scope, $location, $localStorage, UserService, SERVER_API_URL) {
  //     $scope.signin = function () {
  //       var data = {
  //         email: $scope.username,
  //         password: $scope.password
  //       };

  //       $.post(
  //         'http://localhost:9000/auth',
  //         {
  //           email: $scope.username,
  //           password: $scope.password
  //         }
  //       ).done(function (data) {
  //         $location.path('/users');
  //       })
  //       .error(function (msg) {
  //         console.log('error: ');
  //         console.log(msg);
  //         alert('error incorrect credentials');
  //       });
  //     }
  //   }
  // ])

  .controller('UsersController', [
    '$rootScope',
    '$scope',
    '$location',
    '$localStorage',
    'UserService',
    'SERVER_API_URL',
    function ($rootScope, $scope, $location, $localStorage, UserService, SERVER_API_URL) {
      console.log('hello?');
      $scope.users = [];
      $scope.filter = '';

      $scope.getUsersBy = function () {
        $.ajax({
          type: 'GET',
          url: SERVER_API_URL + '/api/users?filter=' + $scope.filter
        }).done(function (data) {
          console.log('result: ');
          console.log(data);
          $scope.users = data.users;
          $scope.$apply();
        }).error(function (err) {
          console.log('err: ');
          console.log(err);
        });
      };

      $scope.changeRole = function (user, roleDesired) {
        $.ajax({
          type: 'PUT',
          url: SERVER_API_URL + '/api/users/' + user._id + '/attributes/role',
          data: {
            role: roleDesired
          }
        })
        .done(function (data) {
          user.role = roleDesired;
          console.log('user was changed')
          $scope.$apply();
        })
        .error(function (msg) {
          console.log(msg);
        });
      };

      $scope.getUsersBy();
    }
  ]);
  