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
    console.log($routeParams);
    $http.get('/data.json')
      .success(function (data) {
        console.log(data);
      })
      .error(function (error) {
        console.throw(error)
      })
    ;
  }

  angular
    .module('azFieldGuide')
    .controller('InitController', [
      '$scope'
    ])
  ;

  function InitController ($scope) {
    angular.element(document).ready(function () {
      console.log('hello world!');
    });
  }

})();