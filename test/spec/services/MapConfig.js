'use strict';

describe('Service: MapConfig', function () {

  beforeEach(module('angular-here-maps'));

  var MapConfigProvider;

  beforeEach(function() {
    angular.module('mockModule', [])
      .config(function(_MapConfigProvider_) {
        MapConfigProvider = _MapConfigProvider_;

        MapConfigProvider.setOptions({
          appId: 'Q4azLpJlFAp5pkcEbagu',
          appCode: 'WT6i13vXvx1JbFky92wqjg',
          libraries: 'ui,mapevents,pano'
        });
      });

    module('angular-here-maps', 'mockModule');

    inject(function() {});
  });

  it('MapConfig should not be undefined', function () {
    expect(MapConfigProvider).not.toBeUndefined();
  });

  it('appId() should return the appId provided', function () {
    expect(MapConfigProvider.mapOptions.appId).not.toBeUndefined();
    expect(MapConfigProvider.mapOptions.appId).toEqual('Q4azLpJlFAp5pkcEbagu');
  });

  it('appCode() should return the appCode provided', function () {
    expect(MapConfigProvider.mapOptions.appCode).not.toBeUndefined();
    expect(MapConfigProvider.mapOptions.appCode).toEqual('WT6i13vXvx1JbFky92wqjg');
  });

  it('libraries() should return the libraries provided', function () {
    expect(MapConfigProvider.mapOptions.libraries).not.toBeUndefined();
    expect(MapConfigProvider.mapOptions.libraries).toEqual('ui,mapevents,pano');
  });

});
