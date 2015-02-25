expenseTrackerAppModule.controller('expenseTracker.expensesController', function ($scope, $location, $routeParams, $rootScope, userModel, expensesModel, categoriesModel, currenciesModel, knobModel) {
  'use strict';

  var currentCategoryId,
    now;

  $scope.categories = categoriesModel.listCategories();
  $scope.categoryColors = categoriesModel.getAvailableColors();
  
  // if the user is on the start page where he can add an expense
  if ($location.$$path === '/expenses/add') {

    $scope.currentExpense = expensesModel.initNewExpense();

    now = new Date();

    $scope.currentExpense.date = now.toDateString();
    $scope.currentExpense.time = now.toLocaleTimeString();

    $scope.currentExpense.amount = expensesModel.getAmount();

    console.log($scope.currentExpense);

    knobModel.initialize($('div.ival'));

  // if we want to delete an expense
  } /*else if ($location.$$path.indexOf('/expenses/remove/') !== -1) {

    var expenseDelPromise = expensesModel.removeExpenseFromDB($routeParams.id);
    expenseDelPromise.succes(function(data, status, headers, config) {
      console.log(data);
      $location.path('/feed');
    });

  }*/ else {

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
    //expensesModel.setCategory(categoryId);
    $scope.currentExpense.categoryId = categoryId;

    $location.path('/expenses/add/details');
  };
  
  $scope.saveExpense = function () {
    var httpPromise = expensesModel.addExpenseToCollection($scope.currentExpense);

    httpPromise.success(function(data, status, headers, config) {
      console.log(data);
      $location.path('/feed');
    });
  };
});