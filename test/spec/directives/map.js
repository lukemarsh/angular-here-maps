'use strict';

describe('Directive: map', function () {

  // load the directive's module
  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile,
    mapController,
    isolateScope;

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    scope = _$rootScope_.$new();
    compile = _$compile_;
  }));

  function compileDirective(tpl) {
    element = angular.element(tpl);
    compile(element)(scope);
    scope.$digest();
    mapController = element.controller('map');
    isolateScope = element.isolateScope();
  }

  beforeEach(function() {
    scope.map = {
      center: {
        lng: -0.13,
        lat: 51
      },
      zoom: 14,
      type: 'satellite'
    };

    element = '<map center="map.center" type="map.type" zoom="map.zoom"></map>';
    compileDirective(element);
  });

  it('element shouldn\'t be undefined', function() {
    expect(element).not.toBeUndefined();
  });

  it('should have a class of hear-map when it compiles', function(){
    expect((element[0]).className).toContain('here-map');
  });

  describe('Rendering the map with center, zoom and type', function() {

    it('should have access to center', function() {
      expect(isolateScope.center).toBeDefined();
      expect(isolateScope.center.lng).toEqual(-0.13);
      expect(isolateScope.center.lat).toEqual(51);
    });

    it('should have access to zoom', function() {
      expect(isolateScope.zoom).toBeDefined();
      expect(isolateScope.zoom).toEqual(14);
    });

    it('should have access to type', function() {
      expect(isolateScope.type).toBeDefined();
      expect(isolateScope.type).toEqual('satellite');
    });

  });

  describe('Rendering the map without center values', function() {

    beforeEach(function() {
      element = '<map zoom="map.zoom"></map>';
      compileDirective(element);
    });

    it('should not have access to center', function() {
      expect(isolateScope.center).toBeUndefined();
    });
  });

  describe('Rendering the map without zoom values', function() {

    beforeEach(function() {
      element = '<map center="map.center"></map>';
      compileDirective(element);
    });

    it('should not have access to zoom', function() {
      expect(isolateScope.zoom).toBeUndefined();
    });

    it('should have default type normal', function() {
      expect(isolateScope.type).toEqual('normal');
    });

  });

  describe('mapController', function() {

    var defaultIcon,
      currentIcon,
      icon,
      coordinates,
      id,
      group;

    describe('addMarkerToMap()', function() {

      it('mapController.getCurrentIcon() must be called', function() {
        spyOn(mapController, 'getCurrentIcon').and.callThrough();
        icon = mapController.getCurrentIcon();
        expect(mapController.getCurrentIcon).toHaveBeenCalled();
      });

      it('mapController.createMapMarker() must be called', function() {
        spyOn(mapController, 'createMapMarker').and.callThrough();
        mapController.createMapMarker();
        expect(mapController.createMapMarker).toHaveBeenCalled();
      });

      it('mapController.createMarkerWindows() must be called', function() {
        spyOn(mapController, 'createMarkerWindows');
        mapController.createMarkerWindows();
        expect(mapController.createMarkerWindows).toHaveBeenCalled();
      });
    });

    describe('getCurrentIcon()', function() {

      it('icon template should equal "default icon template"', function() {
        defaultIcon = {
          template: 'default icon template'
        };
        currentIcon = {};

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.template).toEqual('default icon template');
      });

      it('icon templateUrl equal "default icon template url"', function() {
        defaultIcon = {
          templateUrl: 'default icon template url'
        };
        currentIcon = {};

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.templateUrl).toEqual('default icon template url');
      });

      it('icon window template should equal "default icon window template"', function() {
        defaultIcon = {
          window: {
            template: 'default icon window template'
          }
        };
        currentIcon = {};

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.window.template).toEqual('default icon window template');
      });

      it('icon window templateUrl should equal "default icon window template url"', function() {
        defaultIcon = {
          window: {
            template: 'default icon window template url'
          }
        };
        currentIcon = {};

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.window.template).toEqual('default icon window template url');
      });

      it('icon template should equal "current icon template"', function() {
        defaultIcon = {
          template: 'default icon template'
        };
        currentIcon = {
          template: 'current icon template'
        };

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.template).toEqual('current icon template');
      });

      it('icon window template should equal "current icon window template"', function() {
        defaultIcon = {
          window: {
            template: 'default icon window template'
          }
        };
        currentIcon = {
          window: {
            template: 'current icon window template'
          }
        };

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.window.template).toEqual('current icon window template');
      });

      it('icon window templateUrl should equal "current icon window template url"', function() {
        defaultIcon = {
          window: {
            templateUrl: 'default icon window template url'
          }
        };
        currentIcon = {
          window: {
            templateUrl: 'current icon window template url'
          }
        };

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.window.templateUrl).toEqual('current icon window template url');
      });

      it('icon templateUrl should be undefined', function() {
        defaultIcon = {
          templateUrl: 'default icon template url'
        };
        currentIcon = {
          template: 'current icon template'
        };

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.templateUrl).toBeUndefined();
      });

      it('icon template should be undefined', function() {
        defaultIcon = {
          template: 'default icon template'
        };
        currentIcon = {
          templateUrl: 'current icon template url'
        };

        icon = mapController.getCurrentIcon(defaultIcon, currentIcon);
        expect(icon.template).toBeUndefined();
      });

    });

    describe('createMapMarker()', function() {

      beforeEach(function() {
        group = new H.map.Group();

        coordinates = {
          lng: -0.135559,
          lat: 51.513872
        };
        icon = {
          window: {
            template: 'test'
          },
          template: '<div>test</div>'
        };
      });

      it('marker template must contain marker-icon if template has been set', function() {
        var result = mapController.createMapMarker(group, coordinates, icon, id);
        expect(result.markerTemplate).toContain('marker-icon');
      });

      it('marker template must contain template-marker if template url has been set', function() {
        icon = {
          templateUrl: 'icon template url'
        };
        var result = mapController.createMapMarker(group, coordinates, icon, id);
        expect(result.markerTemplate).toContain('template-marker');
      });

    });

    describe('createMarkerWindows()', function() {

      beforeEach(function() {
        group = new H.map.Group();

        coordinates = {
          lng: -0.135559,
          lat: 51.513872
        };
        icon = {
          window: {
            template: 'test'
          },
          template: '<div>test</div>'
        };
      });

      it('marker window template must contain marker-window if window template has been set', function() {
        var result = mapController.createMarkerWindows(group, coordinates, icon);
        expect(result).toContain('marker-window');
      });

      it('marker window template must contain marker-window if window template has been set', function() {
        icon = {
          window: {
            templateUrl: 'window template url'
          }
        };
        var result = mapController.createMarkerWindows(group, coordinates, icon);
        expect(result).toContain('template-window');
      });

    });

  });
});
