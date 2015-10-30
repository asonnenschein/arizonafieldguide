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
      },
      geojson: {
        data: $scope.selectedData,
        pointToLayer: function (feature, latlng) {
          var marker = new L.marker(latlng, {icon: L.icon({
            iconUrl: '/assets/images/marker.png',
            iconSize: [38, 95]
          })});
          marker.on('click', function () {
            console.log(this.feature.properties);
          })
          return marker;
        },
      }
    });
    leafletData.getMap().then(function(map) {
        var latlngs, coord, i;
        latlngs = [];
        for (i = 0; i < $scope.selectedData.features.length; i++) {
          coord  = $scope.selectedData.features[i].geometry.coordinates;
          latlngs.push(L.GeoJSON.coordsToLatLng(coord));
        }
        map.fitBounds(latlngs);
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