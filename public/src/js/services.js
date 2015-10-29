(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .factory('dataFactory', dataFactory)
  ;

  dataFactory.$inject = ['$rootScope', '$http'];

  function dataFactory ($rootScope, $http) {
    function ajaxGetData () {
      $http.get('data.json')
        .success(function (data) {
          $rootScope.fieldGuideData = data;
        })
        .error(function (error) {
          throw error;
        })
      ;
    }
    return {
      ajaxGetData: ajaxGetData
    }
  }

})();