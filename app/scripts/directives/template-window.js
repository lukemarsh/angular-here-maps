'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:templateWindow
 * @description
 * # templateWindow
 */
angular.module('angular-here-maps')
  .directive('templateWindow', function () {
    return {
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateurl;
      }
    };
  });
