(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .controller('FieldGuideController', [
      '$scope',
      '$routeParams',
      FieldGuideController
    ])
  ;

  function FieldGuideController ($scope, $routeParams, $http) {
    function selectedData () {
      return {
        "type": $scope.fieldGuideData.type,
        "features": $scope.fieldGuideData.features.filter(function (x) {
          return x.properties.city === $routeParams.city;
        })
      }
    }
    $scope.selectedData = selectedData();
  }

  angular
    .module('azFieldGuide')
    .controller('MapController', [
      '$scope',
      '$routeParams',
      'leafletData',
      MapController
    ])
  ;

  function MapController ($scope, $routeParams, leafletData) {
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
    angular.extend($scope.layers.overlays, {
      images: {
        data: $scope.selectedData
      }
    });
    console.log($scope.geojson);
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