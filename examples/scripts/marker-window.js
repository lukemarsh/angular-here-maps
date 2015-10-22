'use strict';

angular
  .module('markerWindow', [
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
    $scope.marker = {
      coordinates : {
        lng: -0.14,
        lat: 51.513872
      },
      icon: {
        window: {
          template: 'icon params = latitude: {{marker.coordinates.lat}}, longitude: {{marker.coordinates.lng}}'
        }
      }
    };
  });
