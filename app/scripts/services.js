'use strict';

angular
  .module('exclusrWeb')
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