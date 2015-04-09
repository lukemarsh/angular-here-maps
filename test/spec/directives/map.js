'use strict';

describe('Directive: map', function () {

  // load the directive's module
  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile;

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    compile = _$compile_;
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

  it('element shouldn\'t be undefined', function() {
    expect(element).not.toBeUndefined();
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
      expect(element.isolateScope().zoom).toEqual(14);
    });
  });

  describe('Rendering the map without center values', function() {

    beforeEach(function() {
      element = '<map zoom="map.zoom"></map>';
      compileDirective(element);
    });

    it('should not have access to center', function() {
      expect(element.isolateScope().center).toBeUndefined();
    });
  });

  describe('Rendering the map without zoom values', function() {

    beforeEach(function() {
      element = '<map center="map.center"></map>';
      compileDirective(element);
    });

    it('should not have access to zoom', function() {
      expect(element.isolateScope().zoom).toBeUndefined();
    });

  });
});
