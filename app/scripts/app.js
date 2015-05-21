'use strict';

angular
  .module('exclusrWeb', ['ngStorage', 'ngRoute'])
  .config([
    '$routeProvider',
    '$httpProvider',
    function ($routeProvider, $httpProvider) {

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $routeProvider
        .when('/', {
          // templateUrl: 'partials/signin.html',
          templateUrl: 'partials/users.html',
          controller: 'UsersController'
          // controller: 'SigninController'
        })
        .when('/venues', {
          templateUrl: 'partials/venues.html',
          controller: 'VenuesController'
        })
        // .when('/users', {
        //   templateUrl: 'partials/users.html',
        //   controller: 'UsersController'
        // })
        .otherwise({
          redirectTo: '/'
        });


      // $httpProvider.interceptors.push([
      //   '$q',
      //   '$location',
      //   '$localStorage',
      //   function ($q, $location, $localStorage) {
      //     return {
      //       'request': function (config) {
      //         console.log('from request???');
      //         config.headers = config.headers || {};

      //         if ($localStorage.token) {
      //           config.headers.Authorization = 'Bearer ' + $localStorage.token;
      //         }

      //         return config;
      //       },
      //       'responseError': function(response) {
      //         console.log('from error???');
      //         if (response.status === 401 || response.status === 403) {
      //           $location.path('/');
      //         }

      //         return $q.reject(response);
      //       }
      //     };
      //   }
      // ]);
    }
  ]);

