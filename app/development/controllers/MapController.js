'use strict';

angular.module('angular-here-maps-development')
  .controller('MapController', function($scope, $window) {
    $scope.iconContent = 'ABC';
    $scope.newIconContent = 'GHI';
    $scope.windowContent = 'DEF';
    $scope.map = {
      zoom : 14,
      center : {
        lng: -0.135559,
        lat: 51.513872
      },
      animation: true,
      typeMap: 'normal' // normal || satellite
    };
    $scope.marker = {
      coordinates : {
        lng: -0.15,
        lat: 51.513872
      },
      icon: {
        templateUrl: 'development/templates/icon.html',
        window: {
          template: 'hello'
        },
        events: {
          tap: function() {
            $window.alert('test');
          }
        }
      }
    };

    $scope.number = 0;

    $scope.incrementByOne = function() {
      $scope.number++;
    };

    $scope.decrementByOne = function() {
      $scope.number--;
    };

    $scope.markers = {
      locations: [
        {
          coordinates: {
            lng: -0.135559,
            lat: 51.513872
          },
          icon: {
            template: '<div class="icon">new icon</div>'
          },
          id: 1
        },
        {
          coordinates: {
            lng: -0.16,
            lat: 51.513872
          },
          icon: {
            window: {
              template: 'icon window template test'
            }
          },
          id: 2
        }
      ],
      icon: {
        window: {
          templateUrl: 'development/templates/window.html'
        }
      }
    };

    $scope.moveCenter = function(){
      $scope.map.center = {
        lng: $scope.map.center.lng + (Math.random() / 100),
        lat: $scope.map.center.lat + (Math.random() / 100)
      };
    };

    $scope.mapOnLoad = function(platform, map){
      $scope.platform = platform;
      $scope.mapObj = map;
    };

    /**
    * Example Center Map on Tap
    */
    $scope.mapEventOnTap = function(event, platform, map){
      console.log('mapEventOnTap event', event, platform, map);
      var coord = map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
      $scope.$apply(function(){
        $scope.map.center = coord;
      });
    };

    $scope.mapEventOnDoubleTap = function(event, platform, map){
      console.log('mapEventOnDoubleTap event', event, platform, map);
    };

    $scope.mapEventOnDragStart = function(event, platform, map){
      console.log('mapEventOnDragStart event', event, platform, map);
    };

    $scope.mapEventOnDrag = function(event, platform, map){
      console.log('mapEventOnDrag event', event, platform, map);
    };

    $scope.mapEventOnDragEnd = function(event, platform, map){
      console.log('mapEventOnDragEnd event', event, platform, map);
    };

    $scope.plusZoom = function(){
      $scope.map.zoom++;
    };

    $scope.minusZoom = function(){
      $scope.map.zoom--;
    };

  });
