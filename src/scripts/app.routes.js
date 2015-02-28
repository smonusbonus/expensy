expenseTrackerAppModule.config(['$routeProvider', function ($routeProvider) {

// main navigation
$routeProvider.when('/expenses/add', {templateUrl: 'views/expense-add.html', controller: 'ExpensesController'});
$routeProvider.when('/expenses/add/category', {templateUrl: 'views/expense-add-category.html', controller: 'ExpensesController'});
$routeProvider.when('/expenses/add/details', {templateUrl: 'views/expense-add-details.html', controller: 'ExpensesController'});
$routeProvider.when('/expenses/remove/:id', {templateUrl: 'views/expense-add.html', controller: 'ExpensesController'});

$routeProvider.when('/feed', {templateUrl: 'views/feed.html', controller: 'FeedController'});
$routeProvider.when('/feed/detail/:id', {templateUrl: 'views/feed-detail.html', controller: 'FeedController'});

$routeProvider.when('/overview', {templateUrl: 'views/overview.html', controller: 'OverviewController'});
$routeProvider.when('/settings', {templateUrl: 'views/settings.html', controller: 'SettingsController'});

$routeProvider.when('/overview/weekly', {templateUrl: 'views/overview-weekly.html', controller: 'OverviewController'});

$routeProvider.when('/goals', {templateUrl: 'views/goals.html', controller: 'GoalsController'});

$routeProvider.when('/settings/goals/add', {templateUrl: 'views/goals-add.html', controller: 'GoalsController'});

$routeProvider.when('/settings/budget', {templateUrl: 'views/budget.html', controller: 'SettingsController'});
$routeProvider.when('/settings/change-currency', {templateUrl: 'views/change-currency.html', controller: 'SettingsController'});
$routeProvider.when('/settings/maximum-per-spending', {templateUrl: 'views/maximum-per-spending.html', controller: 'SettingsController'});

$routeProvider.when('/settings/categories', {templateUrl: 'views/categories.html', controller: 'CategoriesController'});
$routeProvider.when('/settings/categories/add', {templateUrl: 'views/categories-add.html', controller: 'CategoriesController'});

// root path
$routeProvider.otherwise({redirectTo: '/expenses/add'});
}]);