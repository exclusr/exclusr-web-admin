'use strict';

angular
  .module('exclusrWeb')
  .factory('VenueService', [
    'SERVER_API_URL',
    function (SERVER_API_URL) {
      return {
        getVenues: function (filter, feedback) {
          $.ajax({
            type: 'GET',
            url: SERVER_API_URL + '/api/venues?filter=' + filter
          }).done(function (data) {
            feedback(null, data.venues);
          }).error(function (err) {
            feedback(err);
          });
        },
        createVenue: function (venue, feedback) {
          $.ajax({
            url: SERVER_API_URL + '/api/venues',
            type: 'POST',
            data: venue,
          }).done(function (data) {
            feedback(null, data.venue);
          }).error(function (err) {
            feedback(err);
          });
        },
        editVenue: function (venue, feedback) {
          console.log('venue: ');
          console.log(venue);
          $.ajax({
            url: SERVER_API_URL + '/api/venues/' + venue._id,
            type: 'PUT',
            data: venue
          }).done(function (data) {
            feedback(null, data.venue);
          }).error(function (err) {
            feedback(err);
          });
        }
      };
    }
  ])
  .factory('UserService', [
    '$http',
    '$localStorage',
    function ($http, $localStorage) {
      var apiURL = 'http://localhost:9000';

      return {
        signin: function (data, success, error) {
          console.log('sending: \n%s', JSON.stringify(data));

          $http({
            method: 'POST',
            url: apiURL + '/auth',
            data: data,
            headers: {'Content-Type': 'application/json'}
          })
          .success(success)
          .error(error);
        },

        getUsers: function (data, success, error) {
          $http
            .get(apiURL + '/api/users?filter=' + data.filter)
            .success(success)
            .error(error);
        }
      };
    }
  ]);