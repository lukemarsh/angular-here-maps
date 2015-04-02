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
        var defaultLayers;

        var platform = new H.service.Platform({
          'app_id': MapConfig.appId(),
          'app_code': MapConfig.appCode(),
          'ppi': 640
        });

        platform.configure(H.map.render.panorama.RenderEngine);

        defaultLayers = platform.createDefaultLayers();

        var map = new H.Map(
          $element[0],
          defaultLayers.normal.map
        );

        this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        this.ui = H.ui.UI.createDefault(map, defaultLayers);

        if ($scope.zoom) {
          map.setZoom($scope.zoom);
        }

        if ($scope.center) {
          map.setCenter($scope.center);
        }

        window.addEventListener('resize', function () {
          map.getViewPort().resize();
        });
      }
    };
  }]);
