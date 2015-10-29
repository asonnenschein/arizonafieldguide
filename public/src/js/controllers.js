(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .controller('FieldGuideController', [
      '$scope',
      '$routeParams',
      '$http',
      FieldGuideController
    ])
  ;

  function FieldGuideController ($scope, $routeParams, $http) {

  }

  angular
    .module('azFieldGuide')
    .controller('MapController', [
      '$scope',
      MapController
    ])
  ;

  function MapController ($scope) {
    angular.extend($scope, {
        defaults: {
            tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 14,
            path: {
                weight: 10,
                color: '#800000',
                opacity: 1
            }
        }
    });
  }

  angular
    .module('azFieldGuide')
    .controller('ContentController', [
      '$scope',
      ContentController
    ])
  ;

  function ContentController ($scope) {

  }


})();