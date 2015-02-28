expenseTrackerAppModule
.controller('OverviewController', function($scope, $rootScope, userModel, expensesModel, categoriesModel, currenciesModel) {
	'use strict';

	$scope.budgetChartVisible = false;
	$scope.catChartVisible = true;
	$scope.timeChartVisible = false;
	$scope.categoriesList = {};
	$scope.sortedCategoryExp = [];

	$scope.getCategoryById = userModel.getCategoryById;

	Chart.defaults.global.responsive = true;

	$scope.updateCategorySums = function () {

		var promise = expensesModel.getExpensesByCategory();

		promise.then(function(expenses) {

			$scope.sortedCategoryExp = expenses;
			console.log(expenses);

		}, function(reason) {
		  console.log('Failed: ' + reason);
		});

	};
	$scope.updateCategorySums();


	$scope.categoryColors = categoriesModel.getAvailableColors();

	$scope.createBudgetChart = function () {
		var canvas = document.getElementById('byBudgetChart');
      	var context = canvas.getContext('2d');
      	context.canvas.width = 300;
		context.canvas.height = 200;
		context.clearRect(0,0,canvas.width,canvas.height);
		$scope.chartBudget = new Chart(context).Line(getBudgetData(),{pointDot : false, bezierCurve : false,scaleShowGridLines : false});
		$scope.budgetChartVisible = true;
		$scope.catChartVisible = false;
		$scope.timeChartVisible= false;
	};

	$scope.createWeekChart = function () {
		var canvas = document.getElementById('byTimeChart');
      	var context = canvas.getContext('2d');
      	context.canvas.width = 300;
		context.canvas.height = 200;
		context.clearRect(0,0,canvas.width,canvas.height);
		$scope.chartTime = new Chart(context).Line(getTimeData(),{});
		$scope.budgetChartVisible = false;
		$scope.catChartVisible = false;
		$scope.timeChartVisible= true;
	};

	$scope.createCatChart = function () {

    // Get the context of the canvas element we want to select
		var ctx = document.getElementById('byCategoryChart').getContext('2d');
    ctx.width = 300;
		ctx.height = 200;
		//ctx.clearRect(0,0, canvas.width, canvas.height);

		// request expenses sorted by category
		var promise = expensesModel.getExpensesByCategory();
		promise.then(function(expenses) {
			var newCatChart = new Chart(ctx).Doughnut(expenses);
		}, function(reason) {
		  console.log('Failed: ' + reason);
		});

		// handle visibility of other charts
		$scope.budgetChartVisible = false;
		$scope.catChartVisible = true;
		$scope.timeChartVisible = false;
	};

	// create cat chart as default 
	$scope.createCatChart();


	$scope.weeklyTotals = expensesModel.getWeeklyTotals();
	var currentMonth = (new Date()).getMonth();
	$scope.monthlyTotal = expensesModel.getMonthlyTotal(currentMonth);
	$scope.budget = userModel.getBudget();

	/*var getCategoryData = function(){	
		return expensesModel.getExpensesByCategory();
	};*/

	var getTimeData = function(){
		return expensesModel.getExpensesByTime();
	};

	var getBudgetData = function(){
		return expensesModel.getExpensesByBudget();
	};

	//Get context with jQuery - using jQuery's .get() method.
	/*var ctxCategory = $("#byCategoryChart").get(0).getContext("2d");
	ctxCategory.width = 300;
	ctxCategory.height= 200;
	var myNewChart1 = new Chart(ctxCategory);
	$scope.chartCategory = new Chart(ctxCategory).Doughnut($scope.categoriesList, {});*/

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