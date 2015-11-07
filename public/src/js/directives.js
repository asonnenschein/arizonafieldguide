(function () {

  'use strict';

  angular
    .module('azFieldGuide')
    .directive('activeFeature', activeFeature)
  ;

  function activeFeature () {
    var directive = {
      templateUrl: '/dist/templates/active-feature.html',
      restrict: 'E',
      controller: 'ContentController',
      bindToController: true
    };
    return directive;
  }

})();