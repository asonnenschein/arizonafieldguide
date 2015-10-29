(function () {

  'use strict';

  angular
    .module('azFieldGuide', ['ngRoute'])
  ;

  angular
    .module('azFieldGuide')
    .config(configure)
  ;

  configure.$inject = ['$routeProvider'];

  function configure ($routeProvider) {
    $routeProvider
      .when('/:city/', {
        templateUrl: 'dist/partials/field-guide.html',
        controller: 'FieldGuideController'
      })
      .otherwise({
        redirectTo: '/tucson/'
      })
    ;
  }

})();