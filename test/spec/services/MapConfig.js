'use strict';

describe('Service: MapConfig', function () {

  beforeEach(module('angular-here-maps'));

  var MapConfigProvider;

  beforeEach(function() {
    angular.module('mockModule', [])
      .config(function(_MapConfigProvider_) {
        MapConfigProvider = _MapConfigProvider_;

        MapConfigProvider.setOptions({
          appId: '',
          appCode: '',
          libraries: 'ui,mapevents,pano',
          pixelRatio: 2,
          pixelPerInch: 320
        });
      });

    module('angular-here-maps', 'mockModule');

    inject(function() {});
  });

  it('MapConfig should not be undefined', function () {
    expect(MapConfigProvider).not.toBeUndefined();
  });

  it('appId() should return the appId provided', function () {
    expect(MapConfigProvider.mapOptions.appId).toEqual('Q4azLpJlFAp5pkcEbagu');
  });

  it('appCode() should return the appCode provided', function () {
    expect(MapConfigProvider.mapOptions.appCode).toEqual('WT6i13vXvx1JbFky92wqjg');
  });

  it('libraries() should return the libraries provided', function () {
    expect(MapConfigProvider.mapOptions.libraries).toEqual('ui,mapevents,pano');
  });

  it('pixel ratio should return the pixel ratio provided', function() {
    expect(MapConfigProvider.mapOptions.pixelRatio).toEqual(2);
  });

  it('pixel per inch should return the pixel per inch provided', function() {
    expect(MapConfigProvider.mapOptions.pixelPerInch).toEqual(320);
  });

});
