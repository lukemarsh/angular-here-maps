'use strict';

/**
 * @ngdoc directive
 * @name angularHereMapsApp.directive:map
 * @description
 * # map
 */
angular.module('angular-here-maps')
  .directive('map', function (MapConfig, $document, $compile) {
    return {
      template: '<div class="here-map"><div ng-transclude></div></div>',
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
          behavior,
          marker;

        if (MapConfig.libraries()) {
          modules = MapConfig.libraries().split(',');
        }

        $scope.refreshMarkers = function() {
          var mapIcons = $document.find('marker-icon');
          _.each(mapIcons, function(mapIcon) {
            $compile(mapIcon)($scope);
          });
          $scope.$apply();
        };

        var platform = new H.service.Platform({
          'app_id': MapConfig.appId(),
          'app_code': MapConfig.appCode()
        });

        defaultLayers = platform.createDefaultLayers(512, MapConfig.pixelPerInch());

        this.map = new H.Map(
          $element[0],
          defaultLayers.normal.map,
          {
            pixelRatio: MapConfig.pixelRatio()
          }
        );

        if ($scope.zoom) {
          this.map.setZoom($scope.zoom);
        }

        if ($scope.center) {
          this.map.setCenter($scope.center);
        }

        window.addEventListener('resize', function () {
          this.map.getViewPort().resize();
        }.bind(this));

        _.each(modules, function(module) {
          if (module === 'ui') {
            ui = H.ui.UI.createDefault(this.map, defaultLayers);
          }
          if (module === 'pano') {
            platform.configure(H.map.render.panorama.RenderEngine);
          }
          if (module === 'mapevents') {
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          }
        }.bind(this));

        this.addMarkerToMap = function(coordinates, icon) {
          if (icon && icon.type === 'html') {
            if (icon.data) {
              angular.extend($scope, icon.data);
            }
            var template = '<marker-icon><div>' + icon.template + '</div></marker-icon>';
            var markerIcon = new H.map.DomIcon(template);
            marker = new H.map.DomMarker(coordinates, {
              icon: markerIcon
            });
          } else {
            marker = new H.map.Marker(coordinates);
          }
          this.map.addObject(marker);
        };

        this.map.addEventListener('mapviewchangeend', function() {
          $scope.refreshMarkers();
        });
      }
    };
  });
