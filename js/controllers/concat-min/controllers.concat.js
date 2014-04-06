expenseTrackerAppModule.controller('expenseTracker.categoriesController', function ($scope, $location, categoriesModel, userModel, navigationService) {
	'use strict';

	$scope.currentUser = userModel.getCurrentUser();
	
	$scope.categoryColors = categoriesModel.getAvailableColors();
	$scope.selectedColor = -1;
	$scope.goBack = navigationService.goBack;

	if ($location.$$path === '/settings/categories/add') {
		$scope.currentCategory = categoriesModel.initNewCategory();
		$scope.availableColors = categoriesModel.getAvailableColors();
	} else {
		$scope.categories = categoriesModel.listCategories();
	}
	
	$scope.chooseColorForCategory = function (colorId) {
		// reset color id on toggle
		if ($scope.selectedColor === colorId) {
			colorId = -1;
		}

		$scope.selectedColor = colorId;
		categoriesModel.setCategoryColorById(colorId);
	};

	$scope.saveCategory = function () {
		categoriesModel.saveCurrentCategoryToCollection();

		//$location.path('/categories');
		$scope.goBack();
	};

	$scope.removeCategory = function () {
		var clickedAnchor = document.getElementsByClassName('triggered-active-modal'),
			anchorHref,
			currentModal,
			categoryId;

		clickedAnchor = clickedAnchor[0];
		categoryId = clickedAnchor.dataset.categoryid;

		categoriesModel.removeCategoryFromCollection(categoryId);

		anchorHref = clickedAnchor.getAttribute('href');

		currentModal = document.querySelector(anchorHref);
		currentModal.classList.toggle('active');
	};

});
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
expenseTrackerAppModule.controller('expenseTracker.feedController', function ($scope, $location, $routeParams, userModel, expensesModel, categoriesModel, currenciesModel) {
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
		$scope.expense = expensesModel.getExpenseById($routeParams.id);
		$scope.category = categoriesModel.getCategoryById($scope.expense.category_id);
		$scope.categoryColor = categoriesModel.getCategoryColorById($scope.category.color_id);

	// if on feeds main page	
	} else {
		$scope.expenses = expensesModel.getExpensesChronologically();
		$scope.expenses_categories = [];

		for (var i = 0; i < $scope.expenses.length; i++) {
			$scope.expenses_categories.push({
				expense : $scope.expenses[i],
				category : categoriesModel.getCategoryById($scope.expenses[i].category_id)
			});
		}
	}

	$scope.openDetailView = function (expenseId) {
		$location.path('/feed/detail/' + expenseId);
	};
});
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
expenseTrackerAppModule.controller('expenseTracker.overviewController', function($scope, $rootScope, userModel, expensesModel, categoriesModel, currenciesModel) {
	'use strict';
	$scope.budgetChartVisible = false;
	$scope.catChartVisible = true;
	$scope.timeChartVisible= false;

	$scope.categoriesList = (function(){
		var categoryList = categoriesModel.listCategories();
		var amountPerCategory = expensesModel.getExpensesByCategory();
		for (var key in categoryList){
			categoryList[key].amount = amountPerCategory[key].value;
		}
		return categoryList;
	})();
	$scope.categoryColors = categoriesModel.getAvailableColors();

	$scope.getBudgetChart = function () {
		var canvas = document.getElementById('byBudgetChart');
      	var context = canvas.getContext('2d');
      	context.canvas.width = 300;
		context.canvas.height = 200;
		context.clearRect(0,0,canvas.width,canvas.height)
		$scope.chartBudget = new Chart(context).Line(getBudgetData(),{pointDot : false, bezierCurve : false,scaleShowGridLines : false});
		$scope.budgetChartVisible = true;
		$scope.catChartVisible = false;
		$scope.timeChartVisible= false;
	};

	$scope.getWeekChart = function () {
		var canvas = document.getElementById('byTimeChart');
      	var context = canvas.getContext('2d');
      	context.canvas.width = 300;
		context.canvas.height = 200;
		context.clearRect(0,0,canvas.width,canvas.height)
		$scope.chartTime = new Chart(context).Line(getTimeData(),{});
		$scope.budgetChartVisible = false;
		$scope.catChartVisible = false;
		$scope.timeChartVisible= true;
	};

	$scope.getCatChart = function () {
		var canvas = document.getElementById('byCategoryChart');
      	var context = canvas.getContext('2d');
      	context.canvas.width = 300;
		context.canvas.height = 200;
		context.clearRect(0,0,canvas.width,canvas.height)
		$scope.chartCategory = new Chart(context).Doughnut(getCategoryData());
		$scope.budgetChartVisible = false;
		$scope.catChartVisible = true;
		$scope.timeChartVisible= false;
	};

	$scope.weeklyTotals = expensesModel.getWeeklyTotals();
	var currentMonth = (new Date()).getMonth();
	$scope.monthlyTotal = expensesModel.getMonthlyTotal(currentMonth);
	$scope.budget = userModel.getBudget();

	var getCategoryData = function(){	
		return expensesModel.getExpensesByCategory();
	};

	var getTimeData = function(){
		return expensesModel.getExpensesByTime();
	};

	var getBudgetData = function(){
		return expensesModel.getExpensesByBudget();
	};

	//Get context with jQuery - using jQuery's .get() method.
	var ctxCategory = $("#byCategoryChart").get(0).getContext("2d");
	ctxCategory.width = 300;
	ctxCategory.height= 200;
	var myNewChart1 = new Chart(ctxCategory);
	$scope.chartCategory = new Chart(ctxCategory).Doughnut(getCategoryData(),{});

	var ctxTime = $("#byTimeChart").get(0).getContext("2d");
	ctxTime.width = 300;
	ctxTime.height= 200;
	var myNewChart2 = new Chart(ctxTime);
	$scope.chartTime = new Chart(ctxTime).Line(getTimeData(),{});

	var ctxBudget = $("#byBudgetChart").get(0).getContext("2d");
	ctxBudget.width = 300;
	ctxBudget.height= 200;
	var myNewChart3 = new Chart(ctxBudget);
	$scope.chartBudget = new Chart(ctxBudget).Line(getBudgetData(),{pointDot : false, bezierCurve : false,scaleShowGridLines : false});

	// currency user has selected in the settings
	$scope.userCurrency = currenciesModel.getCurrencyById(userModel.getCurrency());

});
expenseTrackerAppModule.controller('expenseTracker.settingsController', function ($scope, $location, categoriesModel, userModel, goalsModel, currenciesModel, navigationService) {
	'use strict';

	$scope.currentUser = userModel.getCurrentUser();
	$scope.currencies = currenciesModel.getCurrenciesList();
	$scope.userCurrency = currenciesModel.getCurrencyById($scope.currentUser.currency);
	$scope.goBack = navigationService.goBack;

	$scope.setCurrency = function (currencyId) {
		$scope.userCurrency = currencyId;
		
		userModel.setCurrency(currencyId);
	};

	$scope.checkCurrency = function (currencyId) {
		if (userModel.getCurrency() === currencyId) {
			return 'active';
		} else {
			return '';
		}
	};

	$scope.redirectToSettingsPage = function () {
		$location.path('/settings');
	};
});