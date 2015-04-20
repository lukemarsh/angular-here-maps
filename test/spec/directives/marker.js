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
    scope.iconContent = 'ABC';
    scope.marker = {
      coordinates : {
        lat: 51,
        lng: -0.13
      },
      icon: {
        template: '<div ng-bind="content"></div>',
        data: {
          content: scope.iconContent
        }
      }
    };

    element = '<map><marker coordinates="marker.coordinates" icon="marker.icon"></marker></map>';
    compileDirective(element);

    markerElement = element.find('marker');
  });

  it('element shouldn\'t be undefined', function() {
    expect(element).not.toBeUndefined();
  });

  describe('Rendering the marker with coordinate and type values', function() {
    it('should have access to coordinates', function() {
      expect(markerElement.isolateScope().coordinates).toBeDefined();
      expect(markerElement.isolateScope().coordinates.lng).toEqual(-0.13);
      expect(markerElement.isolateScope().coordinates.lat).toEqual(51);
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

  });

  describe('Accesing data of the icon', function() {
    it('should contain the iconContent from the scope', function() {
      expect(markerElement.isolateScope().icon.data).not.toBeUndefined();
    });
  });

});
