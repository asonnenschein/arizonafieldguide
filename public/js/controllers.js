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
    $scope.city = city;
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
        tileLayerOptions: {
          detectRetina: true
        }
      },
      geojson: {
        data: FeatureDataFactory.getFilteredData(),
        pointToLayer: function (feature, latlng) {
          var marker = new L.marker(latlng, {icon: L.icon({
            iconUrl: '/assets/images/marker-small.png',
            iconAnchor: [0, 10]
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

      if (!ActiveFeatureService.getActiveFeature()) {
        ActiveFeatureService.setActiveFeature(filteredData.features[0]);
      }

      map.fitBounds(latlngs, {padding: [50, 50]});

      map.on('resize', function () {
        map.fitBounds(latlngs, {padding: [50, 50]});
      });

      $scope.$on('activefeature:updated', function (event, data) {
        map.eachLayer(function (layer) {
          if (layer.hasOwnProperty("feature")) {
            if (layer.feature.properties.id === data.properties.id) {
              layer.setIcon(L.icon({
                iconUrl: '/assets/images/marker-large.png',
                iconAnchor: [0, 20]
              }));
              map.fitBounds([layer.getLatLng()], {maxZoom: 15});
            }
            else {
              layer.setIcon(L.icon({
                iconUrl: '/assets/images/marker-small.png',
                iconAnchor: [0, 10]
              }));
            }
          }
        });
      });

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

    $scope.previousFeature = function () {
      var features = FeatureDataFactory.getFilteredData();
      ActiveFeatureService.getPreviousFeature(features);
    }

    $scope.nextFeature = function () {
      var features = FeatureDataFactory.getFilteredData();
      ActiveFeatureService.getNextFeature(features);
    }

  }


})();