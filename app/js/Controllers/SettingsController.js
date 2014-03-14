expenseTrackerAppModule.controller('expenseTracker.SettingsController', function($scope, $location, CategoriesModel, UserModel, GoalsModel, CurrenciesModel) {

	$scope.currentUser = UserModel.getCurrentUser();
	$scope.goal = GoalsModel.addGoal();
	$scope.currencies = CurrenciesModel.getCurrenciesList();

	$scope.redirectToSettingsPage = function() {
		$location.path('/settings');
	}

	$scope.saveBudget = function() {
		$scope.redirectToSettingsPage();
	}
	
	$scope.saveGoal = function() {
		$scope.redirectToSettingsPage();
	}
});