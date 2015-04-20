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
      restrict: 'EA',
      transclude: true,
      replace: true,
      controller: function($scope, $element, $attrs) {
        var defaultLayers,
          modules,
          ui,
          behavior,
          marker,
          markerWindow;

        $scope.zoom = $scope.helpers.useDotNotation($scope, $attrs.zoom);
        $scope.center = $scope.helpers.useDotNotation($scope, $attrs.center);

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

        var createMapMarker = function(coordinates, icon, id) {
          var markerTemplate;

          if (icon) {
            if (icon.templateUrl) {
              markerTemplate = '<template-marker ng-cloak id=' + id + ' templateurl=' + icon.templateUrl + '></template-marker>';
            } else {
              markerTemplate = '<marker-icon id=' + id + '>' + icon.template + '</marker-icon>';
            }
            var markerIcon = new H.map.DomIcon(markerTemplate);
            marker = new H.map.DomMarker(coordinates, {
              icon: markerIcon
            });
          } else {
            marker = new H.map.Marker(coordinates);
          }
        };

        var createMarkerEvents = function(windowTemplate, group, coordinates, events) {

          $scope.removeBubble = function() {
            markerWindow.close();
          };

          group.addEventListener('tap', function() {
            if (events) {
              events.tap(coordinates);
            }
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

        var createMarkerWindows = function(group, coordinates, icon) {
          var events,
            windowTemplate;

          if (icon && icon.events) {
            events = icon.events;
          }

          if (icon && icon.window) {
            if (icon.window.templateUrl) {
              windowTemplate = '<template-window templateurl=' + icon.window.templateUrl + '></template-window>';
            } else {
              windowTemplate = '<marker-window>' + icon.window.template + '</marker-window>';
            }
            if (icon.window.template || icon.window.templateUrl) {
              createMarkerEvents(windowTemplate, group, coordinates, events);
            }
          }
        };

        var getCurrentIcon = function(defaultIcon, currentIcon) {
          var icon = defaultIcon;

          if (currentIcon) {
            if (currentIcon.template || currentIcon.templateUrl) {
              icon = currentIcon;
            }
            if (currentIcon.window) {
              icon.window = currentIcon.window;
            }
          }

          return icon;
        };

        this.addMarkerToMap = function(coordinates, defaultIcon, currentIcon, id) {
          var group = new H.map.Group();

          var icon = getCurrentIcon(defaultIcon, currentIcon);

          createMapMarker(coordinates, icon, id);
          createMarkerWindows(group, coordinates, icon);

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
 * @name angular-here-maps.directive:markerIcon
 * @description
 * # markerIcon
 */
angular.module('angular-here-maps')
  .directive('markerIcon', function () {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        scope.id = attrs.id;
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
        icon: '='
      },
      link: function(scope, element, attrs, mapController) {
        _.each(scope.locations, function(location) {
          mapController.addMarkerToMap(location.coordinates, scope.icon, location.icon, location.id);
        });
      }
    };
  });
;'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:templateMarker
 * @description
 * # templateMarker
 */
angular.module('angular-here-maps')
  .directive('templateMarker', function () {
    return {
      scope: true,
      link: function(scope, element, attrs) {
        scope.id = attrs.id;
      },
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateurl;
      }
    };
  });
;'use strict';

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
;'use strict';

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
