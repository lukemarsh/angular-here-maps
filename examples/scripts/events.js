'use strict';

angular
  .module('events', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: '',
      appCode: '',
      libraries: 'mapevents'
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
