 /*exported MapConfig */

'use strict';

var MapConfigProvider;

var MapConfig = function() {

  angular.module('mockModule', [])
  .config(function(_MapConfigProvider_) {
    MapConfigProvider = _MapConfigProvider_;

    MapConfigProvider.setOptions({
      appId: 'Q4azLpJlFAp5pkcEbagu',
      appCode: 'WT6i13vXvx1JbFky92wqjg',
      libraries: 'ui,mapevents,pano',
      pixelRatio: 2,
      pixelPerInch: 320
    });
  });

  module('angular-here-maps', 'mockModule');

  inject(function() {});

  return MapConfigProvider;
};