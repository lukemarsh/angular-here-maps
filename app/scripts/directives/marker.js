'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:marker
 * @description
 * # marker
 */
angular.module('angular-here-maps')
  .directive('marker', function () {
    return {
      require: '^map',
      scope: {
      	coordinates: '=',
        icon: '='
      },
      restrict: 'E',
      link: function(scope, element, attrs, mapController) {
        var icon = scope.icon || '';

      	scope.addMarker = function() {
          if (scope.coordinates) {
            mapController.addMarkerToMap(scope.coordinates, icon);
          }
        };

      	scope.$watch('coordinates', function() {
          scope.addMarker();
        });
      }
    };
  });
