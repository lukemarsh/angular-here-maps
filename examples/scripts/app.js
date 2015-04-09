angular
  .module('angularApp', [
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
  })
  .controller('MapController', function($scope) {
    $scope.iconContent = 'ABC';
  	$scope.map = {
      zoom : 14,
      center : { 
        lng: -0.135559,
        lat: 51.513872
      }
    };
    $scope.marker = {
      coordinates : {
        lng: -0.135559,
        lat: 51.513872
      },
      icon : {
        type: 'html',
        template: '<div>a</div>'
      }
    };

    $scope.markers = {
      locations: [
        {
          coordinates: {
            lng: -0.135559,
            lat: 51.513872
          }
        }
      ],
      icon: {
        type: 'html',
        template: '<div ng-bind="content"></div>',
        data: {
          content: $scope.iconContent
        }
      }
    };
  });
