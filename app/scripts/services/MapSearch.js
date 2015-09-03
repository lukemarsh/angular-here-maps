'use strict';

/**
 * @ngdoc service
 * @name angular-here-maps.MapSearch
 * @description
 * # MapSearch
 * Factory in the angular-here-maps.
 */
angular.module('angular-here-maps')
  .factory('MapSearch', function ($http, MapConfig) {
    var baseApiPath = '//places.demo.api.here.com/places/v1/discover/search',
      appId = MapConfig.appId(),
      appCode = MapConfig.appCode(),
      apiPath;

    return {
      get apiPath() {
        return apiPath;
      },

      setApiPath: function() {
        apiPath = baseApiPath + '?at=55%2C0' + '&accept=application%2fjson&app_id=' + appId + '&app_code=' + appCode;
      },

      getPlaces: function(query) {
        this.setApiPath();
        return $http.get(apiPath + '&q=' + query);
      }
    };
  });
