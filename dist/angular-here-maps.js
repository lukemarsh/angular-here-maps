'use strict';

/**
 * @ngdoc overview
 * @name angular-here-maps
 * @description
 * # angular-here-maps
 *
 * Main module of the application.
 */
angular
  .module('angular-here-maps', []);
;'use strict';

/**
 * @ngdoc directive
 * @name angularHereMapsApp.directive:map
 * @description
 * # map
 */
angular.module('angular-here-maps')
  .directive('map', ['MapConfig', function (MapConfig) {
    return {
      template: '<div class="here-map"><ng-transclude></ng-transclude></div>',
      replace: true,
      scope: {
        zoom: '=',
        center: '='
      },
      restrict: 'EA',
      transclude: true,
      controller: function($scope, $element) {
        var defaultLayers,
          modules,
          ui,
          behavior;

        if (MapConfig.libraries()) {
          modules = MapConfig.libraries().split(',');
        }

        var platform = new H.service.Platform({
          'app_id': MapConfig.appId(),
          'app_code': MapConfig.appCode(),
          'ppi': 640
        });

        defaultLayers = platform.createDefaultLayers();

        var map = new H.Map(
          $element[0],
          defaultLayers.normal.map
        );

        if ($scope.zoom) {
          map.setZoom($scope.zoom);
        }

        if ($scope.center) {
          map.setCenter($scope.center);
        }

        window.addEventListener('resize', function () {
          map.getViewPort().resize();
        });

        _.each(modules, function(module) {
          if (module === 'ui') {
            ui = H.ui.UI.createDefault(map, defaultLayers);
          }
          if (module === 'pano') {
            platform.configure(H.map.render.panorama.RenderEngine);
          }
          if (module === 'mapevents') {
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
          }
        });
      }
    };
  }]);
;'use strict';

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
        libraries: function(libraries) {
          return mapOptions.libraries || libraries;
        }
      };
    };

    this.setOptions = function(options) {
      this.mapOptions = options;
    };
  });
