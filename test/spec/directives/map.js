'use strict';

describe('Directive: map', function () {

  // load the directive's module
  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile,
    MapConfig;

  beforeEach(inject(function (_$rootScope_, _$compile_, _MapConfig_) {
    scope = _$rootScope_;
    compile = _$compile_;
    MapConfig = _MapConfig_;

    MapConfig.appId = function() {
      return 'Q4azLpJlFAp5pkcEbagu';
    };

    MapConfig.appCode = function() {
      return 'WT6i13vXvx1JbFky92wqjg';
    };

    MapConfig.libraries = function() {
      return 'ui,mapevents,pano';
    };
  }));

  function compileDirective(tpl) {
    element = angular.element(tpl);
    compile(element)(scope);
    scope.$digest();
  }

  beforeEach(function() {
    scope.map = {
      center: {
        lng: -0.13,
        lat: 51
      },
      zoom: 14
    };

    element = '<map center="map.center" zoom="map.zoom"></map>';
    compileDirective(element);
  });

  it('should have a class of hear-map when it compiles', function(){
    expect((element[0]).className).toContain('here-map');
  });

  describe('Rendering the map with center and zoom values', function() {

    it('should have access to center', function() {
      expect(element.isolateScope().center).toBeDefined();
      expect(element.isolateScope().center.lng).toEqual(-0.13);
      expect(element.isolateScope().center.lat).toEqual(51);
    });

    it('should have access to zoom', function() {
      expect(element.isolateScope().zoom).toBeDefined();
    });
  });

  describe('Rendering the map without center values', function() {

    beforeEach(function() {
      element = '<map zoom="14"></map>';
      compileDirective(element);
    });

    it('should not have access to center', function() {
      expect(element.isolateScope().center).toBeUndefined();
    });

    it('should have access to zoom', function() {
      expect(element.isolateScope().zoom).toBeDefined();
      expect(element.isolateScope().zoom).toEqual(14);
    });
  });

  describe('Rendering the map without zoom values', function() {

    beforeEach(function() {
      scope.map = {
        center: {
          lng: -0.13,
          lat: 51
        },
        zoom: 14
      };
      element = '<map center="map.center"></map>';
      compileDirective(element);
    });

    it('should not have access to zoom', function() {
      expect(element.isolateScope().zoom).toBeUndefined();
    });

    it('should have access to center', function() {
      expect(element.isolateScope().center).toBeDefined();
      expect(element.isolateScope().center.lng).toEqual(-0.13);
      expect(element.isolateScope().center.lat).toEqual(51);
    });
  });

  describe('Rendering the map without center and zoom values', function() {

    beforeEach(function() {
      element = '<map></map>';
      compileDirective(element);
    });

    it('should not have access to center', function() {
      expect(element.isolateScope().center).toBeUndefined();
    });

    it('should not have access to zoom', function() {
      expect(element.isolateScope().zoom).toBeUndefined();
    });
  });
});
