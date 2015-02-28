expenseTrackerAppModule.config(['$routeProvider', function ($routeProvider) {

// main navigation
$routeProvider.when('/expenses/add', {templateUrl: 'views/expense-add.html', controller: 'ExpensesCtrl'});
$routeProvider.when('/expenses/add/category', {templateUrl: 'views/expense-add-category.html', controller: 'ExpensesCtrl'});
$routeProvider.when('/expenses/add/details', {templateUrl: 'views/expense-add-details.html', controller: 'ExpensesCtrl'});
$routeProvider.when('/expenses/remove/:id', {templateUrl: 'views/expense-add.html', controller: 'ExpensesCtrl'});

$routeProvider.when('/feed', {templateUrl: 'views/feed.html', controller: 'FeedCtrl'});
$routeProvider.when('/feed/detail/:id', {templateUrl: 'views/feed-detail.html', controller: 'FeedCtrl'});

$routeProvider.when('/overview', {templateUrl: 'views/overview.html', controller: 'OverviewCtrl'});
$routeProvider.when('/settings', {templateUrl: 'views/settings.html', controller: 'SettingsCtrl'});

$routeProvider.when('/overview/weekly', {templateUrl: 'views/overview-weekly.html', controller: 'OverviewCtrl'});

$routeProvider.when('/goals', {templateUrl: 'views/goals.html', controller: 'GoalsCtrl'});

$routeProvider.when('/settings/goals/add', {templateUrl: 'views/goals-add.html', controller: 'GoalsCtrl'});

$routeProvider.when('/settings/budget', {templateUrl: 'views/budget.html', controller: 'SettingsCtrl'});
$routeProvider.when('/settings/change-currency', {templateUrl: 'views/change-currency.html', controller: 'SettingsCtrl'});
$routeProvider.when('/settings/maximum-per-spending', {templateUrl: 'views/maximum-per-spending.html', controller: 'SettingsCtrl'});

$routeProvider.when('/settings/categories', {templateUrl: 'views/categories.html', controller: 'CategoriesCtrl'});
$routeProvider.when('/settings/categories/add', {templateUrl: 'views/categories-add.html', controller: 'CategoriesCtrl'});

// root path
$routeProvider.otherwise({redirectTo: '/expenses/add'});
}]);