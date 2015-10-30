(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .factory('FeatureDataFactory', FeatureDataFactory)
  ;

  FeatureDataFactory.$inject = ['$rootScope', '$http'];

  function FeatureDataFactory ($rootScope, $http) {
    var featureData
      , filteredData
    ;

    function loadData () {
      $http.get('data.json')
        .success(function (data) {
          featureData = data;
        })
        .error(function (error) {
          throw error;
        })
      ;
    }

    function getFeatureData () {
      return featureData;
    }

    function setFilteredData (city) {
      filteredData = {
        "type": featureData.type,
        "features": featureData.features.filter(function (feature) {
          return feature.properties.city.toLowerCase() === city.toLowerCase();
        })
      }
    }

    function getFilteredData () {
      return filteredData;
    }

    return {
      loadData: loadData,
      getFeatureData: getFeatureData,
      setFilteredData: setFilteredData,
      getFilteredData: getFilteredData
    }
  }

  angular
    .module('azFieldGuide')
    .service('ActiveFeatureService', ActiveFeatureService)
  ;

  function ActiveFeatureService () {
    var activeFeature;

    function setActiveFeature (feature) {
      return activeFeature = feature;
    }

    function getActiveFeature () {
      return activeFeature;
    }

    return {
      setActiveFeature: setActiveFeature,
      getActiveFeature: getActiveFeature
    }
  }

})();