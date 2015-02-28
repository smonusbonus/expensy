//Back-button service
expenseTrackerAppModule.service('navigationService', function () {
  'use strict';

  return {
    goBack : function () {
      window.history.back();
    }
  };
});