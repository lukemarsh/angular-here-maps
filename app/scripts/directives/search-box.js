'use strict';

/**
 * @ngdoc directive
 * @name angular-here-maps.directive:searchBox
 * @description
 * # searchBox
 */
angular.module('angular-here-maps')
  .directive('searchBox', function (MapSearch) {
    return {
      restrict: 'E',
      template: function(tElement, tAttrs) {
        angular.element(tElement).addClass('search-box');
        if (tElement.template) {
          return '<div ng-include=' + tAttrs.template + '>';
        } else {
          return '<input type="text" ng-model="input" ng-change="autocomplete(input)">' +
          '<ul class="autocomplete"><li ng-repeat="place in places">{{place.title}}</li></ul>';
        }
      },
      link: function(scope) {
        scope.autocomplete = function(input) {
          MapSearch.getPlaces(input).then(function(results) {
            scope.places = results.data.results.items;
          });
        };
      }
    };
  });
