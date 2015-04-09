'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:markers
 * @description
 * # markers
 */
angular.module('angular-here-maps')
  .directive('markers', function () {
    return {
      restrict: 'E',
      require: '^map',
      scope: {
        locations: '=',
        icon: '='
      },
      link: function(scope, element, attrs, mapController) {
        _.each(scope.locations, function(location) {
          mapController.addMarkerToMap(location.coordinates, scope.icon);
        });
      }
    };
  });
