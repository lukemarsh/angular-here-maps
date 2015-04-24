'use strict';

angular
  .module('circle', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: 'Q4azLpJlFAp5pkcEbagu',
      appCode: 'WT6i13vXvx1JbFky92wqjg',
      libraries: 'mapevents,ui'
    });
  })
  .controller('MapController', function($scope) {
    $scope.map = {
      zoom : 14,
      center : { 
        lng: -0.135559,
        lat: 51.513872
      }
    };
    $scope.circle = {
      coordinates: {
        lng: -0.14,
        lat: 51.513872
      },
      radius: 1000,
      options: {
        style: {
          strokeColor: 'rgb(0,27.96)',
          lineWidth: 1,
          fillColor: 'rgba(0,27,96,0.1)'
        }
      }
    };
  });
