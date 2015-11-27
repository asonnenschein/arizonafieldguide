(function () {

  'use strict';

  angular
    .module('azFieldGuide', [
      'ngRoute',
      'nemLogging',
      'leaflet-directive'
    ])
  ;

  angular
    .module('azFieldGuide')
    .config(configure)
  ;

  configure.$inject = ['$routeProvider', '$locationProvider'];

  function configure ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'public/templates/home.html',
        controller: 'HomeController'
      })
      .when('/:city', {
        templateUrl: 'public/templates/field-guide.html',
        controller: 'FieldGuideController'
      })
      .otherwise({
        redirectTo: '/'
      })
    ;
    $locationProvider.html5Mode(false);
  }

  angular
    .module('azFieldGuide')
    .run(runblock)
  ;

  runblock.$inject = ['FeatureDataFactory'];

  function runblock (FeatureDataFactory) {
    FeatureDataFactory.loadData();
  }

})();