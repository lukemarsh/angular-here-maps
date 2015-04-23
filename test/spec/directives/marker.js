'use strict';

describe('Directive: marker', function () {

  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile,
    markerElement;

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
    scope.marker = {
      coordinates : {
        lat: 51,
        lng: -0.13
      },
      icon: {
        template: 'icon template'
      }
    };
  });

  describe('Rendering the marker with coordinates', function() {
    
    beforeEach(function() {
      element = '<map><marker coordinates="marker.coordinates"></marker></map>';
      compileDirective(element);

      markerElement = element.find('marker');
    });

    it('should have access to coordinates', function() {
      expect(markerElement.isolateScope().coordinates).toBeDefined();
      expect(markerElement.isolateScope().coordinates.lng).toEqual(-0.13);
      expect(markerElement.isolateScope().coordinates.lat).toEqual(51);
    });

    it('addMarker() should be called', function() {
      spyOn(markerElement.isolateScope(), 'addMarker');
      markerElement.isolateScope().addMarker();
      expect(markerElement.isolateScope().addMarker).toHaveBeenCalled();
    });

  });

  describe('Rendering the marker with an icon', function() {
    
    beforeEach(function() {
      element = '<map><marker icon="marker.icon"></marker></map>';
      compileDirective(element);

      markerElement = element.find('marker');
    });

    it('should have access to icon', function() {
      expect(markerElement.isolateScope().icon).toBeDefined();
    });
  });

  describe('Rendering the marker without values', function() {

    beforeEach(function() {
      element = '<map><marker></marker></map>';
      compileDirective(element);

      markerElement = element.find('marker');
    });

    it('should not have access to coordinates', function() {
      expect(markerElement.isolateScope().coordinates).toBeUndefined();
    });

    it('should not have access to icon', function() {
      expect(markerElement.isolateScope().icon).toBeUndefined();
    });

    it('addMarker() should not be called when coordinates have not been set', function() {
      spyOn(markerElement.isolateScope(), 'addMarker');
      expect(markerElement.isolateScope().addMarker).not.toHaveBeenCalled();
    });

  });

});
