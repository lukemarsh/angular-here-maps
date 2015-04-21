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
      expect(element.scope().center).toBeDefined();
      expect(element.scope().center.lng).toEqual(-0.13);
      expect(element.scope().center.lat).toEqual(51);
    });

    it('should have access to zoom', function() {
      expect(element.scope().zoom).toBeDefined();
      expect(element.scope().zoom).toEqual(14);
    });
  });

  describe('Rendering the map without center values', function() {

    beforeEach(function() {
      element = '<map zoom="map.zoom"></map>';
      compileDirective(element);
    });

    it('should not have access to center', function() {
      expect(element.scope().center).toBeUndefined();
    });
  });

  describe('Rendering the map without zoom values', function() {

    beforeEach(function() {
      element = '<map center="map.center"></map>';
      compileDirective(element);
    });

    it('should not have access to zoom', function() {
      expect(element.scope().zoom).toBeUndefined();
    });

  });

  describe('mapController', function() {

    describe('addMarkerToMap', function() {
      console.log(element);
    });

  });
});
