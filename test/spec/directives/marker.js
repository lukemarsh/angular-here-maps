'use strict';

describe('Directive: marker', function () {

  // load the directive's module
  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile;

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_;
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
        lat: 51.513872,
        lng: -0.135559
      }
    };

    element = '<marker coordinates="marker.coordinates"></marker>';
    compileDirective(element);
  });

  it('element shouldn\'t be undefined', function() {
    expect(element).not.toBeUndefined();
  });

  describe('Rendering the marker with values', function() {

    it('should have access to values', function() {
      expect(element.scope().coordinates).toBeDefined();
    });

  });

  describe('Rendering the marker without values', function() {

    beforeEach(function() {
      element = '<marker></marker>';
      compileDirective(element);
    });

    it('should not have access to coordinates', function() {
      expect(element.scope().coordinates).toBeUndefined();
    });

  });
});
