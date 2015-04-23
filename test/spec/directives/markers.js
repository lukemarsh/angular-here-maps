'use strict';

describe('Directive: markers', function () {

  // load the directive's module
  beforeEach(module('angular-here-maps'));

  var element,
    scope,
    compile,
    markersElement,
    mapController,
    locations,
    icon;

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
    scope.locations = [];

    element = '<map><markers locations="locations"></markers></map>';
    compileDirective(element);

    markersElement = element.find('markers');
  });

  it('element shouldn\'t be undefined', function() {
    expect(element).not.toBeUndefined();
  });

  describe('Rendering the markers with no locations', function() {
    it('the maps should have no markers', function() {
      expect(markersElement.isolateScope().locations).toBeDefined();
      expect(markersElement.isolateScope().locations.length).toEqual(0);
    });
  });

  describe('Rendering the markers with one location', function() {

    beforeEach(function() {
      scope.markers = {
        locations: [
          {
            coordinates: {
              lng: -0.135559,
              lat: 51.513872
            }
          }
        ],
        icon: {
          template: '<div>a</div>'
        }
      };

      element = '<map><markers locations="markers.locations" icon="markers.icon"></markers></map>';
      compileDirective(element);

      markersElement = element.find('markers');

      locations = markersElement.isolateScope().locations;
      icon = markersElement.isolateScope().icon;
    });

    it('the map should have one marker', function() {
      expect(locations).toBeDefined();
      expect(locations.length).toEqual(1);
    });

    it('should have access to icon', function() {
      expect(icon).toBeDefined();
    });

    it('should call addMarkerToMap', function() {
      for (var i = 0; i < locations.length; i++) {
        spyOn(mapController, 'addMarkerToMap').and.callThrough();
        mapController.addMarkerToMap(locations[i].coordinates, icon, locations[i].icon, locations[i].id);
        expect(mapController.addMarkerToMap).toHaveBeenCalledWith(locations[i].coordinates, icon, locations[i].icon, locations[i].id);
      }
    });
  });
});
