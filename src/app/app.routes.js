expenseTrackerAppModule.config(['$routeProvider', function ($routeProvider) {

// main navigation
$routeProvider.when('/expenses/add', {templateUrl: 'app/components/expense/expense-add.html', controller: 'expenseTracker.expensesController'});
$routeProvider.when('/expenses/add/category', {templateUrl: 'app/components/expense/expense-add-category.html', controller: 'expenseTracker.expensesController'});
$routeProvider.when('/expenses/add/details', {templateUrl: 'app/components/expense/expense-add-details.html', controller: 'expenseTracker.expensesController'});
$routeProvider.when('/expenses/remove/:id', {templateUrl: 'app/components/expense/expense-add.html', controller: 'expenseTracker.expensesController'});

$routeProvider.when('/feed', {templateUrl: 'app/components/feed/feed.html', controller: 'expenseTracker.feedController'});
$routeProvider.when('/feed/detail/:id', {templateUrl: 'app/components/feed/feed-detail.html', controller: 'expenseTracker.feedController'});

$routeProvider.when('/overview', {templateUrl: 'app/components/overview/overview.html', controller: 'expenseTracker.overviewController'});
$routeProvider.when('/settings', {templateUrl: 'app/components/settings/settings.html', controller: 'expenseTracker.settingsController'});

$routeProvider.when('/overview/weekly', {templateUrl: 'app/components/overview/overview-weekly.html', controller: 'expenseTracker.overviewController'});

$routeProvider.when('/goals', {templateUrl: 'app/components/goals/goals.html', controller: 'expenseTracker.goalsController'});

$routeProvider.when('/settings/goals/add', {templateUrl: 'app/components/goals/goals-add.html', controller: 'expenseTracker.goalsController'});

$routeProvider.when('/settings/budget', {templateUrl: 'app/components/settings/budget.html', controller: 'expenseTracker.settingsController'});
$routeProvider.when('/settings/change-currency', {templateUrl: 'app/components/settings/change-currency.html', controller: 'expenseTracker.settingsController'});
$routeProvider.when('/settings/maximum-per-spending', {templateUrl: 'app/components/settings/maximum-per-spending.html', controller: 'expenseTracker.settingsController'});

$routeProvider.when('/settings/categories', {templateUrl: 'app/components/categories/categories.html', controller: 'expenseTracker.categoriesController'});
$routeProvider.when('/settings/categories/add', {templateUrl: 'app/components/categories/categories-add.html', controller: 'expenseTracker.categoriesController'});

// root path
$routeProvider.otherwise({redirectTo: '/expenses/add'});
}]);