expenseTrackerAppModule
.controller('SettingsController', function ($scope, $location, categoriesModel, userModel, goalsModel, currenciesModel, navigationService) {
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