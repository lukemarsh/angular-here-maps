'use strict';

describe('Service: MapConfig', function () {

  beforeEach(module('angular-here-maps'));

  var MapConfigProvider, MapConfig;

  beforeEach(function() {
    angular.module('mockModule', [])
      .config(function(_MapConfigProvider_) {
        MapConfigProvider = _MapConfigProvider_;

        MapConfigProvider.setOptions({
          appId: 'dEuIUI8oyzMGgrJVq4dz',
          appCode: '_g3jrZwSCHmKTRFcrySZQw',
          libraries: 'ui,mapevents,pano',
          pixelRatio: 2,
          pixelPerInch: 320,
          useHTTPS: false,
          zoomMax: 15,
          zoomMin: 5
        });
      });

    module('angular-here-maps', 'mockModule');

    inject(function() {});
  });

  it('MapConfig should not be undefined', function () {
    expect(MapConfigProvider).not.toBeUndefined();
  });

  it('appId() should return the appId provided', function () {
    expect(MapConfigProvider.mapOptions.appId).toEqual('dEuIUI8oyzMGgrJVq4dz');
  });

  it('appCode() should return the appCode provided', function () {
    expect(MapConfigProvider.mapOptions.appCode).toEqual('_g3jrZwSCHmKTRFcrySZQw');
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

  it('zoomMax should return the zoomMax provided', function() {
    expect(MapConfigProvider.mapOptions.zoomMax).toEqual(15);
  });

  it('zoomMin should return the zoomMin provided', function() {
    expect(MapConfigProvider.mapOptions.zoomMin).toEqual(5);
  });

  it('useHTTPS should return the useHTTPS provided', function() {
    expect(MapConfigProvider.mapOptions.useHTTPS).toEqual(false);
  });

  it('setOptions should update mapOptions', function() {
    var fakeOptions = {
      test: true
    };
    MapConfigProvider.setOptions(fakeOptions);
    expect(MapConfigProvider.mapOptions).toEqual(fakeOptions);
  });


  describe('MapConfig default values', function() {

    beforeEach(function(){

      MapConfigProvider.setOptions({
        appId: 'dEuIUI8oyzMGgrJVq4dz',
        appCode: '_g3jrZwSCHmKTRFcrySZQw',
        libraries: 'ui,mapevents,pano',
        pixelRatio: 2,
        pixelPerInch: 320
      });

      inject(function(_MapConfig_) {
        MapConfig = _MapConfig_;
      });

    });

    it('MapConfig.zoomMax() should return the default value 18', function() {
      expect(MapConfig.zoomMax()).toEqual(18);
    });

    it('MapConfig.zoomMin() should return the default value 1', function() {
      expect(MapConfig.zoomMin()).toEqual(1);
    });

  });


});
