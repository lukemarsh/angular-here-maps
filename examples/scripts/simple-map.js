'use strict';

angular
  .module('simpleMap', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: '',
      appCode: 'WT6i13vXvx1JbFky92wqjg'
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
