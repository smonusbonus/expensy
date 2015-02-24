expenseTrackerAppModule.controller('expenseTracker.goalsController', function ($scope, $location, goalsModel, userModel, currenciesModel, expensesModel, navigationService) {
  'use strict';

  $scope.currentUser = userModel.getCurrentUser();
  $scope.userCurrency = currenciesModel.getCurrencyById($scope.currentUser.currency);
  $scope.goBack = navigationService.goBack;


  if ($location.$$path === '/settings/goals/add') {
    $scope.currentGoal = goalsModel.initNewGoal();
    $scope.newGoal = {};
    $scope.newGoal.target = '';
    $scope.newGoal.description = '';
  } else if (userModel.isBudgetSet()) {
    $scope.hasBudget = true;
    $scope.goals = goalsModel.getAllGoals();
    $scope.spendingStats = expensesModel.calculateAverageSpendingPerDay();

    $scope.hasPositiveSpendingDelta = function () {
      if ($scope.spendingStats.spendingDelta > 0) {
        return 'savings-positive';
      } else {
        return 'savings-negative';
      }
    };

  } else {
    $scope.hasBudget = false;
  }
  
  $scope.saveGoal = function () {
    goalsModel.saveCurrentGoalToCollection($scope.newGoal.target, $scope.newGoal.description);
    $scope.goBack();
  };

  $scope.getGoalColorBasedOnDays = function (days) {
    var className = 'goal-border';

    if (days <= 10) {
      return className + ' soon';
    } else if (days > 10 && days <= 42) {
      return className + ' near';
    } else if (days > 42) {
      return className + ' far';
    }
  };

  $scope.removeGoal = function () {
    var clickedAnchor = document.getElementsByClassName('triggered-active-modal'),
      anchorHref,
      currentModal,
      goalId;

    clickedAnchor = clickedAnchor[0];
    goalId = clickedAnchor.dataset.goalid;

    goalsModel.removeGoalFromCollection(goalId);

    anchorHref = clickedAnchor.getAttribute('href');

    currentModal = document.querySelector(anchorHref);
    currentModal.classList.toggle('active');
  };
});