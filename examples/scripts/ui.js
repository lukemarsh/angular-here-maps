'use strict';

angular
  .module('ui', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: '',
      appCode: '',
      libraries: 'ui'
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
