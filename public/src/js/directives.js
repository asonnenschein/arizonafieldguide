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
      controller: 'ContentController'
    };
    return directive;
  }

})();