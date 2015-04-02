'use strict';

/**
 * @ngdoc service
 * @name angular-here-maps.MapConfig
 * @description
 * # MapConfig
 * Provider in the angular-here-maps.
 */
angular.module('angular-here-maps')
  .provider('MapConfig', function () {

    this.mapOptions = {};

    this.$get = function() {
      var mapOptions = this.mapOptions;

      return {
        appId: function(appId) {
          return mapOptions.appId || appId;
        },
        appCode: function(appCode) {
          return mapOptions.appCode || appCode;
        }
      };
    };

    this.setOptions = function(options) {
      this.mapOptions = options;
    };
  });
