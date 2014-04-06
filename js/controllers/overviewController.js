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