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
            this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
          }
          if (module === 'pano') {
            platform.configure(H.map.render.panorama.RenderEngine);
          }
          if (module === 'mapevents') {
            behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
          }
        }.bind(this));

        var createMapMarker = function(group, coordinates, icon, id) {
          var markerTemplate,
            events,
            idAttr = '';

          if (id) {
            idAttr = 'id=' + id;
          }

          if (icon && icon.events) {
            events = icon.events;
          }

          if (icon && (icon.template || icon.templateUrl)) {
            if (icon.templateUrl) {
              markerTemplate = '<template-marker ng-cloak ' + idAttr + ' templateurl=' + icon.templateUrl + '></template-marker>';
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

        var createMarkerWindows = function(group, coordinates, icon) {
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

        this.addMarkerToMap = function(coordinates, defaultIcon, currentIcon, id) {
          var group = new H.map.Group();

          var icon = this.getCurrentIcon(defaultIcon, currentIcon);

          createMapMarker(group, coordinates, icon, id);
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
        element.addClass('marker');
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
        var icon = scope.icon || '';

      	scope.addMarker = function() {
          if (scope.coordinates) {
            mapController.addMarkerToMap(scope.coordinates, icon);
          }
        };

      	scope.$watch('coordinates', function() {
          scope.addMarker();
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
        tElement.addClass('marker');
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
