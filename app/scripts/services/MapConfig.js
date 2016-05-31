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
        },
        pixelRatio: function(ratio) {
          return mapOptions.pixelRatio || ratio;
        },
        pixelPerInch: function(pixel) {
          return mapOptions.pixelPerInch || pixel;
        },
        libraries: function(libraries) {
          return mapOptions.libraries || libraries;
        },
        useHTTPS: function(https) {
          return mapOptions.useHTTPS || https;
        },
        zoomMax: function() {
          return mapOptions.zoomMax || 18;
        },
        zoomMin: function() {
          return mapOptions.zoomMin || 1;
        }
      };
    };

    this.setOptions = function(options) {
      this.mapOptions = options;
    };
  });
