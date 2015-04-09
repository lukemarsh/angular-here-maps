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
        var marker;

      	var addMarker = function() {
          if (scope.coordinates) {
            if (scope.icon.type === 'html') {
              var icon = new H.map.DomIcon(scope.icon.template);
              var coordinates = scope.coordinates;
              marker = new H.map.DomMarker(coordinates, {
                  icon: icon
              });
            } else {
              marker = new H.map.Marker(scope.coordinates);
            }
            mapController.map.addObject(marker);
          }
        };

      	scope.$watch('coordinates', function() {
          addMarker();
        });
      }
    };
  });
