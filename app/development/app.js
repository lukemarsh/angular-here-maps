'use strict';

angular
.module('angular-here-maps-development', [
  'angular-here-maps'
])
.config(function(MapConfigProvider) {
  MapConfigProvider.setOptions({
    appId: 'Q4azLpJlFAp5pkcEbagu',
    appCode: 'WT6i13vXvx1JbFky92wqjg',
    libraries: 'ui,mapevents,pano',
    pixelRatio: 2,
    pixelPerInch: 320
  });
});
