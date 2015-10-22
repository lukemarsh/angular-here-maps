'use strict';

angular
  .module('pixelRatio', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: '',
      appCode: '',
      pixelRatio: 2,
      pixelPerInch: 320
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
  });
