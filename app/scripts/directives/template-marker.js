'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:templateMarker
 * @description
 * # templateMarker
 */
angular.module('angular-here-maps')
  .directive('templateMarker', function () {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        scope.id = attrs.id;
      },
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateurl;
      }
    };
  });
