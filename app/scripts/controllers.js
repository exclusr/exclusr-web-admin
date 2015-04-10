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
  .controller('VenuesController', [
    '$scope',
    '$location',
    'VenueService',
    function ($scope, $location, VenueService) {
      $scope.venues = [];
      $scope.filter = '';
      $scope.venue = {};

      getVenues($scope, VenueService);

      $scope.updateVenue = function () {
        var lat = parseFloat($scope.venue.latitude);
        var lng = parseFloat($scope.venue.longitude);
        var name = $scope.venue.name;

        if (!validName(name)) {
          alert('Please insert a valid venue name value.');
          return;
        }

        if (!areNumbers(lat, lng)) {
          alert('Please insert valid latitude or longitude values.');
          return;
        }

        if (!isValidLongitude(lng)) {
          alert('Longitude must be a number between -180 and 180.');
          return;
        }

        if (!isValidLatitude(lat)) {
          alert('Latitude must be a number between -90 and 90.');
          return;
        }

        VenueService.editVenue({
          _id: $scope.venue._id,
          name: name.trim(),
          latitude: lat,
          longitude: lng
        }, function (err, venue) {
          console.log(err);
          getVenues($scope, VenueService);
          $('#modalUpdateVenue').modal('hide');
        });
      };

      $scope.createNewVenue = function () {
        var lat = parseFloat($scope.venue.latitude);
        var lng = parseFloat($scope.venue.longitude);
        var name = $scope.venue.name;

        if (!validName(name)) {
          alert('Please insert a valid venue name value.');
          return;
        }

        if (!areNumbers(lat, lng)) {
          alert('Please insert valid latitude or longitude values.');
          return;
        }

        if (!isValidLongitude(lng)) {
          alert('Longitude must be a number between -180 and 180.');
          return;
        }

        if (!isValidLatitude(lat)) {
          alert('Latitude must be a number between -90 and 90.');
          return;
        }

        VenueService.createVenue({
          name: name.trim(),
          latitude: lat,
          longitude: lng
        }, function (err, venue) {
          console.log(err);

          // refresh venues
          getVenues($scope, VenueService);

          // close modal new venue form
          $('#modalNewVenue').modal('hide');
        });
      };

      $scope.showModalUpdateVenue = function (venue) {
        $scope.venue._id = venue._id;
        $scope.venue.name = venue.name;
        $scope.venue.longitude = venue.location.coordinates[0];
        $scope.venue.latitude = venue.location.coordinates[1];
        $('#modalUpdateVenue').modal('show');
      };

      $scope.showModalCreateVenue = function () {
        $scope.venue = {};
        $('#modalNewVenue').modal('show');
      };

      function getVenues($scope, VenueService) {
        // clear venue
        $scope.venue = {};

        VenueService.getVenues($scope.filter, function (err, venues) {
          if (err) return console.log(err);

          $scope.venues = venues;
          $scope.$apply();
        });
      }

      function validName (name) {
        return is.string(name);
      }

      function areNumbers (lat, lng) {
        return is.all.number(lat, lng);
      }

      function isValidLatitude (lat) {
        return (lat < 90 && lat > -90);
      }

      function isValidLongitude (lng) {
        return (lng < 180 && lng > -180);
      }
    }
  ])
  .controller('UsersController', [
    '$rootScope',
    '$scope',
    '$location',
    '$localStorage',
    'UserService',
    'SERVER_API_URL',
    function ($rootScope, $scope, $location, $localStorage, UserService, SERVER_API_URL) {
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
  