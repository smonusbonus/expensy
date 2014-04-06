expenseTrackerAppModule.controller('expenseTracker.expensesController', function ($scope, $location, $routeParams, $rootScope, userModel, expensesModel, categoriesModel, currenciesModel, knobModel) {
  'use strict';

  var currentCategoryId,
    now;

  $scope.categories = categoriesModel.listCategories();
  $scope.categoryColors = categoriesModel.getAvailableColors();
  
  if ($location.$$path === '/expenses/add') {
    $scope.currentExpense = expensesModel.initNewExpense();

    now = new Date();
    $scope.currentExpense.date = now.toDateString();
    $scope.currentExpense.time = now.toLocaleTimeString();

    $scope.amount = expensesModel.getAmount();

    knobModel.initialize($('div.ival'));

  } else if ($location.$$path.indexOf('/expenses/remove/') !== -1) {
    expensesModel.removeExpenseFromCollection($routeParams.id);
    $location.path('/feed');
  } else {
    $scope.currentExpense = expensesModel.getCurrentExpense();
  }

  $scope.amount = expensesModel.getAmount();

  currentCategoryId = expensesModel.getCategory();

  $scope.selectedCategory = categoriesModel.getCategoryById(currentCategoryId);

  $scope.userCurrency = currenciesModel.getCurrencyById(userModel.getCurrency());

  $scope.chooseCategory = function (categoryId) {
    if (categoryId === undefined) {
      categoryId = 5;
    }
    expensesModel.setCategory(categoryId);

    $location.path('/expenses/add/details');
  };
  
  $scope.saveExpense = function () {
    expensesModel.addExpenseToCollection();

    $location.path('/feed');
  };
});