(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .controller('FieldGuideController', [
      '$scope',
      '$routeParams',
      'FeatureDataFactory',
      FieldGuideController
    ])
  ;

  function FieldGuideController ($scope, $routeParams, FeatureDataFactory) {
    var city = $routeParams.city;
    FeatureDataFactory.setFilteredData(city);
  }

  angular
    .module('azFieldGuide')
    .controller('MapController', [
      '$scope',
      '$routeParams',
      'leafletData',
      'FeatureDataFactory',
      'ActiveFeatureService',
      MapController
    ])
  ;

  function MapController ($scope, $routeParams, leafletData, FeatureDataFactory, ActiveFeatureService) {
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
        data: FeatureDataFactory.getFilteredData(),
        pointToLayer: function (feature, latlng) {
          var marker = new L.marker(latlng, {icon: L.icon({
            iconUrl: '/assets/images/marker.png',
            iconSize: [38, 95]
          })});
          marker.on('click', function () {
            ActiveFeatureService.setActiveFeature(this.feature);
          })
          return marker;
        },
      }
    });

    leafletData.getMap().then(function(map) {
      var coord, filteredData, i, latlngs;
      filteredData = FeatureDataFactory.getFilteredData();
      latlngs = [];
      for (i = 0; i < filteredData.features.length; i++) {
        coord  = filteredData.features[i].geometry.coordinates;
        latlngs.push(L.GeoJSON.coordsToLatLng(coord));
      }
      map.fitBounds(latlngs, {padding: [50, 50]});
    });

  }

  angular
    .module('azFieldGuide')
    .controller('ContentController', [
      '$scope',
      'FeatureDataFactory',
      'ActiveFeatureService',
      ContentController
    ])
  ;

  function ContentController ($scope, FeatureDataFactory, ActiveFeatureService) {
    $scope.$on('activefeature:updated', function (event, data) {
      $scope.feature = data;
    });
  }


})();