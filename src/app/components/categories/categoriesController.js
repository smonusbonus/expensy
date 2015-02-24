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