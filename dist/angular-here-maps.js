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
          marker,
          markerWindow;

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

        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

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
          var group = new H.map.Group();

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
          if (icon && icon.window) {
            var windowTemplate = '<marker-window><div>' + icon.window.template + '</div></marker-window>';
            
            group.addEventListener('tap', function() {
              if (markerWindow) {
                this.ui.removeBubble(markerWindow);
              }
              markerWindow = new H.ui.InfoBubble(coordinates, {
                content: windowTemplate 
              });
              this.ui.addBubble(markerWindow);
            }.bind(this, coordinates), false);
          }
          this.map.addObject(group);
          group.addObject(marker);
        };

        this.map.addEventListener('mapviewchangeend', function() {
          $scope.refreshMarkers();
        });
      }
    };
  });
;'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:marker
 * @description
 * # marker
 */
angular.module('angular-here-maps')
  .directive('marker', function () {
    return {
      require: '^map',
      scope: {
      	coordinates: '=',
        icon: '='
      },
      restrict: 'E',
      link: function(scope, element, attrs, mapController) {

      	var addMarker = function() {
          if (scope.coordinates) {
            mapController.addMarkerToMap(scope.coordinates, scope.icon);
          }
        };

      	scope.$watch('coordinates', function() {
          addMarker();
        });
      }
    };
  });
;'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:markers
 * @description
 * # markers
 */
angular.module('angular-here-maps')
  .directive('markers', function () {
    return {
      restrict: 'E',
      require: '^map',
      scope: {
        locations: '=',
        icon: '=',
        window: '='
      },
      link: function(scope, element, attrs, mapController) {
        _.each(scope.locations, function(location) {
          mapController.addMarkerToMap(location.coordinates, scope.icon);
        });
      }
    };
  });
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
        pixelRatio: function(ratio) {
          return mapOptions.pixelRatio || ratio;
        },
        pixelPerInch: function(pixel) {
          return mapOptions.pixelPerInch || pixel;
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
