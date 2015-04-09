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

        this.map = new H.Map(
          $element[0],
          defaultLayers.normal.map
        );

        if ($scope.zoom) {
          this.map.setZoom($scope.zoom);
        }

        if ($scope.center) {
          this.map.setCenter($scope.center);
        }

        window.addEventListener('resize', function () {
          this.map.getViewPort().resize();
        });

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
      }
    };
  }]);
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
        var marker;
      	// var addDotToMap = function() {
       //    if (scope.icon && scope.icon.type === 'html') {
       //      var dot = document.createElement(scope.icon.element);
       //      //dot.className = scope.icon.className;
       //      var icon = new H.map.DomIcon(dot);
       //      var marker = new H.map.DomMarker(scope.coordinates, {icon: icon});
       //      mapController.map.addObject(marker);
       //    }
       //  };

        // var addCircleToMap = function(){
        //   return mapController.map.addObject(new H.map.Circle(
        //     {lat:scope.coordinates.lat, lng:scope.coordinates.lng},
        //     // The radius of the circle in meters
        //     scope.radius,
        //     {
        //       style: {
        //         strokeColor: 'rgb(0, 37, 102)', // Color of the perimeter
        //         lineWidth: 2,
        //         fillColor: 'rgba(0, 37, 102, 0.05)'  // Color of the circle
        //       }
        //     }
        //   ));
        // };

      	var addMarker = function() {
          if (scope.coordinates) {
            if (scope.icon.type === 'html') {
              var icon = new H.map.DomIcon(scope.icon.template);
              var coordinates = scope.coordinates;
              marker = new H.map.DomMarker(coordinates, {
                  icon: icon
              });
            } else {
              marker = new H.map.Marker(scope.coordinates);
            }
            mapController.map.addObject(marker);
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
