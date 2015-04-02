'use strict';

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
          behavior,
          ui;

        var modules = MapConfig.libraries().split(',');

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
