expenseTrackerAppModule
.controller('FeedCtrl', function ($scope, $location, $routeParams, userModel, expensesModel, categoriesModel, currenciesModel) {
	'use strict';

	$scope.categoryColors = categoriesModel.getAvailableColors();
	$scope.userCurrency = currenciesModel.getCurrencyById(userModel.getCurrency());
	$scope.userBudget = userModel.getBudget();
	$scope.monthlyTotal = expensesModel.getMonthlyTotal();

	$scope.spentBudgetPercentage = (function () {
		if ($scope.userBudget > 0) {
			return Math.round(($scope.monthlyTotal / $scope.userBudget) * 100);
		} else {
			return false;
		}
	}());

	$scope.isOverBudget = (function () {
		if ($scope.spentBudgetPercentage > 100) {
			return true;
		} else {
			return false;
		}
	}());


	// if on feeds/detail page
	if ($location.$$path.indexOf('/feed/detail/') !== -1) {

		var expensePromise = expensesModel.getExpenseByIdFromDB($routeParams.id);
		expensePromise.success(function(data, status, headers, config) {
			$scope.expense = data[0];
			$scope.category = categoriesModel.getCategoryById($scope.expense.categoryId);
			$scope.categoryColor = categoriesModel.getCategoryColorById($scope.category.color_id);
		});

	// if on feeds main page	
	} else {
		
		var expensesPromise = expensesModel.getExpensesFromDB();
		expensesPromise.success(function(data, status, headers, config) {

			$scope.expenses = data;
			$scope.expenses_categories = [];

			console.log(data);

			if ($scope.expenses !== undefined) {
				for (var i = 0; i < $scope.expenses.length; i++) {
					$scope.expenses_categories.push({
						expense : $scope.expenses[i],
						category : categoriesModel.getCategoryById($scope.expenses[i].categoryId)
					});
				}
			}

		});
	}

	$scope.removeExpense = function (expenseId) {

    var expenseDelPromise = expensesModel.removeExpenseFromDB(expenseId);
    expenseDelPromise.success(function(data, status, headers, config) {
      console.log(data);
      $location.path('/feed');
    }).error(function(data, status, headers, config) {
    	console.log('error occurred when trying to delete expense');
    });
    
  };

	$scope.openDetailView = function (expenseId) {
		$location.path('/feed/detail/' + expenseId);
	};
});