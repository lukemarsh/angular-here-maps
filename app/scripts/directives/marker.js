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
        icon: '=',
        zIndex: '='
      },
      restrict: 'E',
      link: function(scope, element, attrs, mapController) {
        var icon = scope.icon || '';
        var coordinates;
        var group;

      	scope.addMarker = function() {
          if (scope.coordinates) {
            coordinates = scope.coordinates;
            group = mapController.addMarkerToMap(scope.coordinates, scope.zIndex, icon);
          }
        };

      	scope.$watch('coordinates', function() {
          if (coordinates) {
            mapController.removeMarker(group);
          }
          scope.addMarker();
        });
      }
    };
  });
