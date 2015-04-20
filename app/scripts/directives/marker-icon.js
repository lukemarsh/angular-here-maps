'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:markerIcon
 * @description
 * # markerIcon
 */
angular.module('angular-here-maps')
  .directive('markerIcon', function () {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        scope.id = attrs.id;
      }
    };
  });
