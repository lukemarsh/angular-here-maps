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
      	radius: '='
      },
      link: function(scope, element, attrs, mapController) {
      	var addDotToMap = function() {
          if (scope.icon && scope.icon.type === 'html') {
            var dot = document.createElement(scope.icon.element);
            //dot.className = scope.icon.className;
            var icon = new H.map.DomIcon(dot);
            var marker = new H.map.DomMarker(scope.coordinates, {icon: icon});
            mapController.map.addObject(marker);
          }
        };

        var addCircleToMap = function(){
          return mapController.map.addObject(new H.map.Circle(
            {lat:scope.coordinates.lat, lng:scope.coordinates.lng},
            // The radius of the circle in meters
            scope.radius,
            {
              style: {
                strokeColor: 'rgb(0, 37, 102)', // Color of the perimeter
                lineWidth: 2,
                fillColor: 'rgba(0, 37, 102, 0.05)'  // Color of the circle
              }
            }
          ));
        };

      	var addCurrentMarker = function() {
          if (scope.coordinates) {
            if (scope.radius) {
              addCircleToMap();
            }
            addDotToMap();
          }
        };

      	scope.$watch('coordinates', function() {
          addCurrentMarker();
        });
      }
    };
  });
