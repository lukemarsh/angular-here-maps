'use strict';

/**
 * @ngdoc directive
 * @name angularHereMapsApp.directive:map
 * @description
 * # map
 */
angular.module('angular-here-maps')
  .directive('map', ['MapConfig', '$document', '$compile', '$window', function (MapConfig, $document, $compile, $window) {
    return {
      template: '<div class="here-map"><div ng-transclude></div></div>',
      restrict: 'EA',
      transclude: true,
      replace: true,
      scope: {
        animation: '=',
        bounds: '=',
        center: '=',
        draggable: '=',
        onLoad: '=',
        onTap: '=',
        onDoubleTap: '=',
        onDragStart: '=',
        onDrag: '=',
        onDragEnd: '=',
        type: '=?',
        layer: '=?',
        wheelzoom: '=',
        zoom: '='
      },
      controller: function($scope, $element) {

        var defaultLayers;
        var modules;
        var behavior;
        var marker;
        var markerWindow;
        var group;
        var animation = $scope.animation || false;
        $scope.type = angular.isDefined($scope.type) ? $scope.type : 'normal';
        $scope.layer = angular.isDefined($scope.layer) ? $scope.layer : 'map';

        if (MapConfig.libraries()) {
          modules = MapConfig.libraries().split(',');
        }

        $scope.refreshMarkers = function() {
          var allIcons = [];
          var templateMarkers = $document.find('template-marker');
          var mapIcons = $document.find('marker-icon');

          allIcons.push(templateMarkers, mapIcons);

          _.each(allIcons, function(mapIcon) {
            $compile(mapIcon)($scope);
          });
          $scope.$apply();
        };

        var platform = new H.service.Platform({
          'app_id': MapConfig.appId(),
          'app_code': MapConfig.appCode()
        });

        defaultLayers = platform.createDefaultLayers(512, MapConfig.pixelPerInch());

        $scope.mapObject = new H.Map(
          $element[0],
          defaultLayers[$scope.type][$scope.layer],
          {
            pixelRatio: MapConfig.pixelRatio()
          }
        );

        var zoomMax = MapConfig.zoomMax();
        var zoomMin = MapConfig.zoomMin();

        $scope.$watch('zoom', function(zoom){
          if (zoom) {
            if (zoom > zoomMax){
              $scope.zoom = zoomMax;
              return;
            }
            if (zoom < zoomMin){
              $scope.zoom = zoomMin;
              return;
            }
            $scope.mapObject.setZoom(zoom, animation);
          }
        });

        $scope.$watch('center', function(center){
          if (center) {
            $scope.mapObject.setCenter(center, animation);
          }
        });

        var setViewBounds = function(bounds) {
          var bbox = new H.geo.Rect(bounds[0], bounds[1], bounds[2], bounds[3]);
          $scope.mapObject.setViewBounds(bbox);
        };

        $scope.$watch('bounds', function(bounds) {
          if (bounds) {
            setViewBounds(bounds);
          }
        });

        $scope.$watchGroup(['type', 'layer'], function(newValues) {
          var type = newValues[0];
          var layer = newValues[1];
          if (type && layer) {
            $scope.mapObject.setBaseLayer(defaultLayers[type][layer]);
          }
        });

        $window.addEventListener('resize', function () {
          $scope.mapObject.getViewPort().resize();
        }.bind(this));

        _.each(modules, function(module) {
          if (module === 'ui') {
            this.ui = H.ui.UI.createDefault($scope.mapObject, defaultLayers);
          }
          if (module === 'pano') {
            platform.configure(H.map.render.panorama.RenderEngine);
          }
          if (module === 'mapevents') {
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents($scope.mapObject));
          }
        }.bind(this));

        this.createMapMarker = function(group, coordinates, icon, id) {
          var markerTemplate,
            events,
            idAttr = '';

          if (id) {
            idAttr = 'id=' + id;
          }

          if (icon && icon.events) {
            events = icon.events;
          }

          if (icon) {
            if (icon.template || icon.templateUrl) {
              if (icon.templateUrl) {
                markerTemplate = '<template-marker ng-cloak ' + idAttr + ' templateurl="' + icon.templateUrl + '"></template-marker>';
              } else {
                markerTemplate = '<marker-icon ' + idAttr + '>' + icon.template + '</marker-icon>';
              }
              var markerIcon = new H.map.DomIcon(markerTemplate);
              marker = new H.map.DomMarker(coordinates, {
                icon: markerIcon
              });
            } else {
              marker = new H.map.Marker(coordinates);
            }

            group.addEventListener('tap', function() {
              if (events) {
                events.tap(coordinates);
              }
            }.bind(this, coordinates), false);

          }

          return {
            markerTemplate: markerTemplate
          };
        };

        var createMarkerEvents = function(windowTemplate, group, coordinates) {

          $scope.removeBubble = function() {
            markerWindow.close();
          };

          group.addEventListener('tap', function() {
            if (markerWindow) {
              this.ui.removeBubble(markerWindow);
            }
            var newTemplate = windowTemplate;
            newTemplate = $compile(newTemplate)($scope);
            $scope.$apply();

            if (windowTemplate) {
              markerWindow = new H.ui.InfoBubble(coordinates, {
                content: newTemplate[0]
              });
              this.ui.addBubble(markerWindow);
            }
          }.bind(this, coordinates), false);
        }.bind(this);

        this.createMarkerWindows = function(group, coordinates, icon) {
          var windowTemplate;

          if (icon && icon.window) {
            if (icon.window.templateUrl) {
              windowTemplate = '<template-window templateurl=' + icon.window.templateUrl + '></template-window>';
            } else {
              windowTemplate = '<marker-window>' + icon.window.template + '</marker-window>';
            }
            if (icon.window.template || icon.window.templateUrl) {
              createMarkerEvents(windowTemplate, group, coordinates);
            }
          }

          return windowTemplate;
        };

        this.getCurrentIcon = function(defaultIcon, currentIcon) {

          var icon = angular.copy(defaultIcon);

          if (currentIcon && currentIcon.template) {
            delete icon.templateUrl;
            icon.template = currentIcon.template;
          }

          if (currentIcon && currentIcon.templateUrl) {
            delete icon.template;
            icon.templateUrl = currentIcon.templateUrl;
          }

          if (currentIcon && currentIcon.window && currentIcon.window.template) {
            delete icon.window.templateUrl;
            icon.window.template = currentIcon.window.template;
          }

          if (currentIcon && currentIcon.window && currentIcon.window.templateUrl) {
            delete icon.window.template;
            icon.window.templateUrl = currentIcon.window.templateUrl;
          }

          return icon;
        };

        this.removeMarker = function() {
          $scope.mapObject.removeObject(group);
        };

        this.addMarkerToMap = function(coordinates, defaultIcon, currentIcon, id) {
          group = new H.map.Group();

          var icon = this.getCurrentIcon(defaultIcon, currentIcon);

          this.createMapMarker(group, coordinates, icon, id);
          this.createMarkerWindows(group, coordinates, icon);

          $scope.mapObject.addObject(group);
          if (marker) {
            marker.setData(coordinates);
            group.addObject(marker);
          }
        };

        $scope.mapObject.addEventListener('mapviewchangeend', function() {
          $scope.refreshMarkers();
          // $scope.zoom = $scope.mapObject.getZoom();
        });

        if (angular.isFunction($scope.onLoad)){
          $scope.onLoad(platform, $scope.mapObject);
        }

        if (angular.isFunction($scope.onTap)){
          $scope.mapObject.addEventListener('tap', function(event) {
            $scope.onTap(event, platform, $scope.mapObject);
          });
        }

        if (angular.isFunction($scope.onDoubleTap)){
          $scope.mapObject.addEventListener('dbltap', function(event) {
            $scope.onDoubleTap(event, platform, $scope.mapObject);
          });
        }

        if (angular.isFunction($scope.onDragStart)){
          $scope.mapObject.addEventListener('dragstart', function(event) {
            $scope.onDragStart(event, platform, $scope.mapObject);
          });
        }

        if (angular.isFunction($scope.onDrag)){
          $scope.mapObject.addEventListener('drag', function(event) {
            $scope.onDrag(event, platform, $scope.mapObject);
          });
        }

        if (angular.isFunction($scope.onDragEnd)){
          $scope.mapObject.addEventListener('dragend', function(event) {
            $scope.onDragEnd(event, platform, $scope.mapObject);
          });
        }

      }
    };
  }]);
