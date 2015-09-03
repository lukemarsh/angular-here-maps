'use strict';

describe('Directive: circle', function () {

  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile,
    circleElement,
    mapController;

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    compile = _$compile_;
  }));

  function compileDirective(tpl) {
    element = angular.element(tpl);
    compile(element)(scope);
    mapController = element.controller('map');
    scope.$digest();
  }

  beforeEach(function() {
    scope.circle = {
      coordinates : {
        lat: 51,
        lng: -0.13
      },
      radius: 1000,
      options: {
        strokeColor: 'red',
        lineWidth: 2,
        fillColor: 'blue'
      }
    };
  });

  describe('Rendering the circle with coordinates', function() {
    
    beforeEach(function() {
      element = '<map><circle coordinates="circle.coordinates"></circle></map>';
      compileDirective(element);

      circleElement = element.find('circle');
    });

    it('should have access to coordinates', function() {
      expect(circleElement.isolateScope().coordinates).toBeDefined();
      expect(circleElement.isolateScope().coordinates.lng).toEqual(-0.13);
      expect(circleElement.isolateScope().coordinates.lat).toEqual(51);
    });

  });

  describe('Rendering the circle with a radius', function() {
    
    beforeEach(function() {
      element = '<map><circle radius="circle.radius"></circle></map>';
      compileDirective(element);

      circleElement = element.find('circle');
    });

    it('should have access to radius', function() {
      expect(circleElement.isolateScope().radius).toBeDefined();
    });
  });

  describe('Rendering the circle with options', function() {
    
    beforeEach(function() {
      element = '<map><circle options="circle.options"></circle></map>';
      compileDirective(element);

      circleElement = element.find('circle');
    });

    it('should have access to options', function() {
      expect(circleElement.isolateScope().options).toBeDefined();
    });
  });

  describe('Rendering the circle without options or radius', function() {

    beforeEach(function() {
      element = '<map><circle></circle></map>';
      compileDirective(element);

      circleElement = element.find('circle');
    });

    it('should not have access to coordinates', function() {
      expect(circleElement.isolateScope().coordinates).toBeUndefined();
    });

    it('should not have access to icon', function() {
      expect(circleElement.isolateScope().radius).toBeUndefined();
    });

  });

});
