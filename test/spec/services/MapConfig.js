'use strict';

describe('Service: MapConfig', function () {

  // load the service's module
  beforeEach(module('angular-here-maps'));

  // instantiate service
  var MapConfig;

  beforeEach(inject(function (_MapConfig_) {
    MapConfig = _MapConfig_;
  }));

  it('should do something', function () {
    expect(!!MapConfig).not.toBeUndefined();
  });

});
