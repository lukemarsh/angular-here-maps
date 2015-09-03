 /*globals MapConfig */

'use strict';

describe('Service: MapSearch', function () {

  // load the service's module
  beforeEach(module('angular-here-maps'));

  beforeEach(MapConfig);

  var $httpBackend,
    apiPath,
    MapSearch;

  // instantiate service
  beforeEach(inject(function (_MapSearch_, _$httpBackend_) {
    MapSearch = _MapSearch_;
    $httpBackend = _$httpBackend_;
    MapSearch.setApiPath();
    apiPath = MapSearch.apiPath;

    $httpBackend.whenGET(apiPath + '&q=nandos')
      .respond(200, {
        name: 'Nandos'
      });
  }));

  it('should return at least one place when you search for a location', function() {
    var query = 'nandos';
    $httpBackend.expectGET(apiPath + '&q=' + query);
    MapSearch.getPlaces(query).then(function(results) {
      expect(results).not.toBeUndefined();
      expect(results.data.name).toEqual('Nandos');
    });
    $httpBackend.flush();
  });

});
