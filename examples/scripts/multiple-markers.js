'use strict';

angular
  .module('multipleMarkers', [
    'angular-here-maps'
  ])
  .config(function(MapConfigProvider) {
    MapConfigProvider.setOptions({
      appId: '',
      appCode: '',
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
    $scope.markers = {
      locations: [
        {
          coordinates: {
            lat: 51.516007,
            lng: -0.183935
          }
        }, 
        {
          coordinates: {
            lat: 51.50917,
            lng: -0.13381
          }
        }
      ]
    };
  });
