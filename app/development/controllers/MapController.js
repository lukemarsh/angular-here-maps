'use strict';

angular.module('angular-here-maps-development')
  .controller('MapController', function($scope) {
    $scope.iconContent = 'ABC';
    $scope.newIconContent = 'GHI';
    $scope.windowContent = 'DEF';
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
        template: '<div>marker</div>',
        window: {
          template: 'hello'
        },
        events: {
          tap: function() {
            alert('test');
          }
        }
      }
    };

    $scope.number = 0;

    $scope.incrementByOne = function() {
      $scope.number++;
    };

    $scope.decrementByOne = function() {
      $scope.number--;
    };

    $scope.markers = {
      locations: [
        {
          coordinates: {
            lng: -0.135559,
            lat: 51.513872
          },
          icon: {
            template: '<div>new icon</div>'
          },
          id: 1
        },
        {
          coordinates: {
            lng: -0.16,
            lat: 51.513872
          },
          icon: {
            window: {
              template: 'icon window template test'
            }
          },
          id: 2
        }
      ],
      icon: {
        window: {
          templateUrl: 'development/templates/window.html'
        }
      }
    };
  });