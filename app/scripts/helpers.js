'use strict';

/**
 * @ngdoc helpers
 * @name angular-here-maps.run
 * @description
 * Helper functions for angular-here-maps.
 */
angular.module('angular-here-maps')
  .run(function($rootScope) {
    $rootScope.helpers = {
      useDotNotation: function(object, path) {
        path = String(path).split('.');

        for (var i = 0; i < path.length; i++) {
          object = object[path[i]];
        }
        return object;
      }
    };
  });
