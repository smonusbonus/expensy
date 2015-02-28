//CategoryModel Object constructor
expenseTrackerAppModule.service('categoriesModel', function () {
	'use strict';

	// @TODO: use the ID from the backend / database
	var nextIDCounter = 6;

	var categories = [],
		category = {
			id : -1,
			title : '',
			color_id : '',
			icon : '',
			custom: null
		},
		currentCategory,
		color = {
			id : -1,
			title : '',
			initial : '',
			color_value : ''
		},
		availableColors = [];

		availableColors.push( 
		{
			id 	  : 0,
			title : 'turquoise',
			color_value : '#1abc9c'
		},{
			id 	  : 1,
			title : 'green sea',
			color_value : '#16a085'
		},{
			id 	  : 2,
			title : 'emerland',
			color_value : '#2ecc71'
		},{
			id 	  : 3,
			title : 'nephritis',
			color_value : '#27ae60'
		},{
			id 	  : 4,
			title : 'peter priver',
			color_value : '#3498db'
		},{
			id 	  : 5,
			title : 'belize hole',
			color_value : '#2980d9'
		},{
			id 	  : 6,
			title : 'sun flower',
			color_value : '#f1c40f'
		},{
			id 	  : 7,
			title : 'orange',
			color_value : '#f39c12'
		},{
			id 	  : 8,
			title : 'carrot',
			color_value : '#d35400'
		},{
			id 	  : 9,
			title : 'alazarin',
			color_value : '#e74c3c'
		},{
			id 	  : 10,
			title : 'pomegranate',
			color_value : '#c0392b'
		},{
			id 	  : 11,
			title : 'amethyst',
			color_value : '#9b59b6'
		},{
			id 	  : 12,
			title : 'grey',
			color_value : '#CCC'
		});

	// default categories
	categories.push(
		{
			id : 0,
			title : 'groceries',
			color_id : 1,
			icon : 'fa-shopping-cart',
			custom : false
		},
		{
			id : 1,
			title : 'eating out',
			color_id : 6,
			icon : 'fa-cutlery',
			custom : false
		},
		{
			id : 2,
			title : 'coffee',
			color_id : 8,
			icon : 'fa-coffee',
			custom : false
		},
		{
			id : 3,
			title : 'beer',
			color_id : 7,
			icon : 'fa-beer',
			custom : false
		},
		{
			id : 4,
			title : 'cell phone',
			color_id : 4,
			icon : 'fa-phone',
			custom : false
		},
		{
			id : 5,
			title : 'other',
			color_id : 12,
			icon : 'fa-ellipsis-h',
			custom : false
		}
	);

	return {

		initNewCategory : function () {
			currentCategory = jQuery.extend(true, {}, category);
			currentCategory.id = nextIDCounter;
			nextIDCounter = nextIDCounter + 1;
			currentCategory.custom = true;
			return currentCategory;
		},

		saveCurrentCategoryToCollection : function () {
			currentCategory.initial = currentCategory.title.charAt(0);
			categories.push(currentCategory);
		},

		removeCategoryFromCollection : function (categoryId) {
			for (var key in categories) {
				if (categories[key].id === parseInt(categoryId, 10)) {
					categories.splice(categories.indexOf(categories[key]), 1);
				}
			}
		},
		
		setCategoryColorById : function (colorId) {
			currentCategory.color_id = colorId;
		},

		getAvailableColors : function () {
			return availableColors;
		},

		listCategories : function () {
			return categories;
		},

		getCategoryById : function (categoryId) {
			for (var key in categories) {
				if (categories[key].id === categoryId) {
					return categories[key];
				}
			}
		},

		getCategoryColorById : function (colorId) {
			for (var key in availableColors) {
				if (availableColors[key].id === colorId) {
					return availableColors[key];
				}
			}
		}
	};
});
