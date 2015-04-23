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
      require: '^map',
      scope: {
        coordinates: '=',
        radius: '=',
        options: '='
      },
      link: function(scope, element, attrs, mapController) {
        mapController.map.addObject(new H.map.Circle(
          {lat: scope.coordinates.lat, lng: scope.coordinates.lng},
          scope.radius,
          {
            style: {
              strokeColour: scope.options.strokeColour,
              lineWidth: scope.options.lineWidth,
              fillColor: scope.options.fillColor
            }
          }
        ));
      }
    };
  });
