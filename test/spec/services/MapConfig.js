'use strict';

describe('Service: MapConfig', function () {

  // load the service's module
  beforeEach(module('angular-here-maps'));

  // instantiate service
  var mapConfigProvider;

  beforeEach(function () {
    // Initialize the service provider by injecting it to a fake module's config block
    angular.module('testApp', function () {})
      .config(function (MapConfigProvider) {
        mapConfigProvider = MapConfigProvider;

        mapConfigProvider.appId = function() {
          return '1';
        };

        mapConfigProvider.appCode = function() {
          return '2';
        };

        mapConfigProvider.libraries = function() {
          return 'lib1,lib2';
        };
      });
    module('angular-here-maps', 'testApp');

    inject(function () {});
  });

  it('MapConfig should not be undefined', function () {
    expect(mapConfigProvider).not.toBeUndefined();
  });

  it('appId() should return the appId provided', function () {
    expect(mapConfigProvider.appId()).not.toBeUndefined();
    expect(mapConfigProvider.appId()).toEqual('1');
  });

  it('appCode() should return the appCode provided', function () {
    expect(mapConfigProvider.appCode()).not.toBeUndefined();
    expect(mapConfigProvider.appCode()).toEqual('2');
  });

  it('libraries() should return the libraries provided', function () {
    expect(mapConfigProvider.libraries()).not.toBeUndefined();
    expect(mapConfigProvider.libraries()).toEqual('lib1,lib2');
  });

});
