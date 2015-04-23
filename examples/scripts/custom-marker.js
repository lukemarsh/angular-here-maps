'use strict';

angular
  .module('customMarker', [
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
    $scope.marker = {
      coordinates : {
        lng: -0.14,
        lat: 51.513872
      },
      icon: {
        templateUrl: 'templates/marker.html'
      }
    };
  });
