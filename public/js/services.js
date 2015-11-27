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

    function loadData (callback) {
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
      if (city) {
        filteredData = {
          "type": featureData.type,
          "features": featureData.features.filter(function (feature) {
            return feature.properties.city.toLowerCase() === city.toLowerCase();
          })
        }
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

  ActiveFeatureService.$inject = ['$rootScope'];

  function ActiveFeatureService ($rootScope) {
    var activeFeature;

    function setActiveFeature (feature) {
      activeFeature = feature;
      return $rootScope.$broadcast('activefeature:updated', activeFeature);
    }

    function getActiveFeature () {
      return activeFeature;
    }

    function getPreviousFeature (data) {
      var i, index;
      for (i = 0; i < data.features.length; i++) {
        if (data.features[i].properties.id === activeFeature.properties.id) {
          index = i;
        }
      }
      if (index - 1 < 0) {
        setActiveFeature(data.features[data.features.length - 1]);
      }
      else {
        setActiveFeature(data.features[index - 1]);
      }
    }

    function getNextFeature (data) {
      var i, index;
      for (i = 0; i < data.features.length; i++) {
        if (data.features[i].properties.id === activeFeature.properties.id) {
          index = i;
        }
      }
      if (index + 1 === data.features.length) {
        setActiveFeature(data.features[0]);
      }
      else {
        setActiveFeature(data.features[index + 1]);
      }
    }

    return {
      setActiveFeature: setActiveFeature,
      getActiveFeature: getActiveFeature,
      getPreviousFeature: getPreviousFeature,
      getNextFeature: getNextFeature
    }
  }

})();