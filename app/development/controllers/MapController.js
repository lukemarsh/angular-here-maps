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
      icon : {
        template: '<div>a</div>',
        window: {
          template: '<div>this is the window template</div>'
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
            template: 'hello',
            window: {
              templateUrl: 'development/templates/window.html'
            }
          },
          id: 1
        },
        {
          coordinates: {
            lng: -0.16,
            lat: 51.513872
          },
          icon: {
            template: 'hello again',
            window: {
              template: 'testing'
            }
          },
          id: 2
        }
      ],
      icon: {
        templateUrl: 'development/templates/icon.html',
        window: {
          templateUrl: 'development/templates/window.html'
        }
      }
    };
  });