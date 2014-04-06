expenseTrackerAppModule.directive('exptWhenActive', function ($location) {
  'use strict';

  return {
    scope: true,
    //template: '<a class="btn" ng-class="{active: on}">Toggle me!</a>',
    link: function (scope, element, attrs) {
      var currentSection = $location.$$path.split('/');
      currentSection = currentSection[1];
      element = element['0'];

      if (currentSection === element.dataset.sectionname) {
        element.classList.add('active');
      }

    }
  };
});