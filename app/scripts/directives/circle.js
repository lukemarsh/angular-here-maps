'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:circle
 * @description
 * # circle
 */
angular.module('angular-here-maps')
  .directive('circle', function () {
    return {
      restrict: 'E',
      require: '^map',
      scope: {
        coordinates: '=',
        radius: '=',
        options: '='
      },
      link: function(scope, element, attrs, mapController) {
        if (scope.coordinates && scope.radius) {
          mapController.map.addObject(new H.map.Circle(
            {
              lat: scope.coordinates.lat,
              lng: scope.coordinates.lng
            },
            scope.radius,
            scope.options ? scope.options : null
          ));
        }
      }
    };
  });
