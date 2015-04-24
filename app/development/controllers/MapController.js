'use strict';

angular.module('angular-here-maps-development')
  .controller('MapController', function($scope, $window) {
    $scope.map = {
      zoom : 14,
      center : { 
        lng: -0.135559,
        lat: 51.513872
      }
    };
    $scope.marker = {
      coordinates : {
        lng: -0.14,
        lat: 51.513872
      },
      icon: {
        template: '<div class="dot"></div>',
      }
    };

    $scope.number = 0;


    $scope.markers = {
      locations: [
        {
          coordinates: {
            lng: -0.135559,
            lat: 51.513872
          },
          id: 1,
          icon: {
            events: {
              tap: function() {
                $scope.number = 1;
              }
            }
          }
        },
        {
          coordinates: {
            lng: -0.16,
            lat: 51.513872
          },
          id: 2,
          icon: {
            events: {
              tap: function() {
                $scope.number = 2;
              }
            }
          }
        }
      ],
      icon: {
        templateUrl: 'development/templates/icon.html',
        window: {
          templateUrl: 'development/templates/window.html'
        }
      }
    };

    $scope.circle = {
      radius: 1000,
      options: {
        style: {
          strokeColor: 'rgb(0,27.96)',
          lineWidth: 1,
          fillColor: 'rgba(0,27,96,0.1)'
        }
      }
    };

  });